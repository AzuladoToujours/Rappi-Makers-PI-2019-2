const {
  getUsersEmailFetch,
} = require('../../fetchs/user/get-users-email-fetch');
const {
  notifyCandidatesAndHiredsFetch,
} = require('../../fetchs/mailer/candidates-hireds-mail-fetch');
const { getCandidatesDAO } = require('../../dao/user/get-candidates-dao');
const { getHiredsDAO } = require('../../dao/user/get-hireds-dao');

const notifyCandidatesAndHiredsService = async (vacancyId) => {
  let hireds = await getHiredsDAO(vacancyId);
  let candidates = await getCandidatesDAO(vacancyId);

  let usersArray = [...candidates, ...hireds];
  if (usersArray !== 'undefined' && usersArray.length > 0) {
    let fetchPromise = getUsersEmailFetch(usersArray);

    Promise.all(fetchPromise).then((emails) => {
      notifyCandidatesAndHiredsFetch(emails, vacancyId);
    });
  }
};

module.exports = { notifyCandidatesAndHiredsService };
