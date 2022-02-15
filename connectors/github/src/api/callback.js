'use strict'

const GithubService = require('../services/githubService')
const IssuerService = require('../services/issuerService')
const { ISSUE_CREDENTIALS_TYPE, FRONTEND_REDIRECT_URL } = process.env
const schema = require('../helpers/schema')

const issuer = new IssuerService()

const callback = async (req, res) => {
  try {
    const { code, did } = req.query

    const githubService = await GithubService.initialize(code)
    const userData = await githubService.getUserData()
    const userRepos = await githubService.getUserRepos()
    const topTenMostUsedLanguages = await githubService.getLanguages(userRepos)
    const preparedDataForIssue = githubService.prepareDataForIssuing(
      userData,
      userRepos,
      topTenMostUsedLanguages
    )

    const validationResults = await issuer.validateDataAgainstSchema(
      preparedDataForIssue,
      schema
    )

    if (validationResults.errors.length > 0) {
      throw new Error('schema got changed')
    }

    const issueResult = await issuer.issueStructeredData(
      preparedDataForIssue,
      ISSUE_CREDENTIALS_TYPE
    )

    const userVCData = {
      id: userData.id,
      login: userData.login,
      name: userData.name,
      url: userData.url,
      email: userData.email,
      followers: userData.followers,
      following: userData.following,
      twitterUsername: userData.twitter_username,
      holderDid: did,
    }

    const reposVCData = userRepos.map((currRepo) => ({
      id: currRepo.id,
      fullName: currRepo.full_name,
      ownerLogin: currRepo.owner.login,
      url: currRepo.url,
      forksCount: currRepo.forks_count,
      stargazersCount: currRepo.stargazers_count,
      watchersCount: currRepo.watchers_count,
      holderDid: did,
    }))
    res.status(302).redirect(FRONTEND_REDIRECT_URL)
  } catch (e) {
    res.status(302).redirect(FRONTEND_REDIRECT_URL)
  }
}

module.exports = callback
