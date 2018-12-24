import moment from 'moment';

export function findAllIndexOfString(regex = /\n/g, stringValue = '') {
  // var regex = /\n/g;
  // var instr = bodyHtml;
  var current;
  var matchIndexes = [];

  while ((current = regex.exec(stringValue)) != null) {
    matchIndexes.push(current.index);
  }

  return matchIndexes;
}

export function formatInfoUserToSaveLocal(otherInfo, dataServer) {

  if (typeof otherInfo !== 'object' || !otherInfo || !dataServer || Object.keys(dataServer).length < 1) return {};

  return {
    ...dataServer,
    accessToken: otherInfo.accessToken || null,
    data_access_expiration_time: otherInfo.data_access_expiration_time || 0,
    reauthorize_required_in: otherInfo.reauthorize_required_in || 0,
    signedRequest: otherInfo.signedRequest || 0,
    userFaceBookID: otherInfo.userID || null,
    userFirebaseID: otherInfo.uid || null,
    isAnonymous: otherInfo.isAnonymous || false,
    refreshToken: otherInfo.refreshToken || null,
    type: otherInfo.isAnonymous ? 2 : 1
  }
}

export const dataServerForAnonymousUser = {
  type: 2,
  username: 'Anonymous',
  email: 'none_email@mail.com',
  picture: 'none',
  category: [],
}

export function getUnixTime() {
  return moment().unix();
}

export function formatCurrentUnixTime(unixTime = -1) {
  if (!unixTime || unixTime < 0) {
    return moment().format("DD/MM/YYYY hh:mm:ss");
  }
  return moment(unixTime * 1000).format("DD/MM/YYYY hh:mm:ss");
}

export function formatCommentReplyTime(unixTime = -1) {
  if (!unixTime || unixTime < 0 || +unixTime < 0) {
    return '';
  }
  const arrWords = [
    'a few seconds ago',
    'seconds ago',
    'a minute ago',
    'minutes ago',
    'an hour ago',
    'hours ago',
    'a day ago',
    'days ago',
    'a month ago',
    'months ago',
    'a year ago',
    'years ago',
  ];

  const arrWordsRepplace = [
    'vài giây trước',
    'giây trước',
    '1 phút trước',
    'phút trước',
    '1 tiếng trước',
    'tiếng trước',
    '1 ngày trước',
    'ngày trước',
    '1 tháng trước',
    'tháng trước',
    '1 năm trước',
    'năm trước',
  ];
  const timeFromNow = moment(unixTime * 1000).fromNow();
  let timeFormated = '';
  let isMatch = false;
  arrWords.forEach((word, index) => {
    if (timeFromNow.includes(word) && !isMatch) {
      const indexOfWord = timeFromNow.indexOf(word);
      timeFormated = timeFromNow.slice(0, indexOfWord) + arrWordsRepplace[index];
      isMatch = true;
      return;
    }
  });
  return timeFormated;
}

export const storage = () => {
  if (!typeof window.localStorage === "undefined") return window.localStorage;
  else if (!typeof localStorage === "undefined") return localStorage;
  else return false;
};

export function sleep(time) {
  return new Promise(resolve => setTimeout(() => resolve(), time))
};