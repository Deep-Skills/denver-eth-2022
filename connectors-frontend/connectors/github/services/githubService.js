'use strict'

const { OAuthApp, Octokit } = require('octokit')
const ethers = require('ethers')

let { GITHUB_APP_CLIENT_ID, GITHUB_APP_CLIENT_SECRET } = process.env

class GithubService {
  constructor(octokit) {
    this.octokit = octokit
  }

  static getVerifiedAddress(digest, signature) {
    return ethers.utils.verifyMessage(digest, signature)
  }

  static async initialize(code) {
    const app = new OAuthApp({
      clientType: 'oauth-app',
      clientId: GITHUB_APP_CLIENT_ID,
      clientSecret: GITHUB_APP_CLIENT_SECRET,
    })
    const octokit = await app.getUserOctokit({ code })

    return new GithubService(octokit)
  }

  prepareDataForIssuing(rawUserData, rawReposData, topTenMostUsedLanguages) {
    return {
      username: rawUserData.login,
      repos: rawReposData.map((repo) => repo.full_name),
      languages: topTenMostUsedLanguages,
    }
  }

  async getUserData() {
    const response = await this.octokit.rest.users.getAuthenticated()
    if (response.status !== 200) {
      throw new Error(JSON.stringify(response))
    }
    return response.data
  }

  async getLanguages(repos) {
    const languagesReq = await Promise.all(
      repos.map((repo) =>
        this.octokit.rest.repos.listLanguages({
          owner: repo?.owner?.login,
          repo: repo.name,
        })
      )
    )
    const languages = languagesReq.map((lang) => lang.data)
    const languageUsage = languages.reduce((acc, curr) => {
      const keys = Object.keys(curr)
      for (let key of keys) {
        acc[key] = (acc[key] || 0) + curr[key]
      }
      return acc
    }, {})
    const topTenMostUsedLanguages = Object.entries(languageUsage)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([language, _]) => language)
    return topTenMostUsedLanguages
  }

  async getUserRepos() {
    const iterator = this.octokit.paginate.iterator(
      this.octokit.rest.repos.listForAuthenticatedUser,
      {
        per_page: 100,
      }
    )
    let publicRepos = []
    for await (const { data: repos } of iterator) {
      const notForkNotPrivate = repos?.filter(
        (repo) => !repo.private
      )

      publicRepos = [...publicRepos, ...notForkNotPrivate]
    }

    return publicRepos
  }
}

module.exports = GithubService
