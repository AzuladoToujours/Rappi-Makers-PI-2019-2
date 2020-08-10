const {
  getUsersEmailFetch,
} = require('../../fetchs/user/get-users-email-fetch');
const { notifyHiredsFetch } = require('../../fetchs/mailer/hireds-mail-fetch');
const { getHiredsDAO } = require('../../dao/user/get-hireds-dao');

const notifyHiredsService = async (vacancyId) => {
  let hireds = await getHiredsDAO(vacancyId);

  if (hireds !== 'undefined' && hireds.length > 0) {
    let fetchPromise = getUsersEmailFetch(hireds);

    Promise.all(fetchPromise).then((emails) => {
      notifyHiredsFetch(emails);
    });
  }
};

module.exports = { notifyHiredsService };
