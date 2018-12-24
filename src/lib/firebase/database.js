import firebase from 'react-native-firebase';
import {
  getUnixTime
} from '../../utils/utils';

export const FSTORE = firebase.database();

export const saveAnonymousUserData = (data) => {
  try {
    const userRef = FSTORE.ref('anonymous/' + uid);

    userRef.on("value", (snapshot) => {
      const params = formatUserData(snapshot.val(), data);
      let result = userRef.update(params);
    })

  } catch (error) {}
};

export const getDirectData = (path, callback) => {
  if (path) {
    try {
      const dataRef = FSTORE.ref(path);
      dataRef.once("value", (snapshot) => {
        return callback(snapshot.val());
      });
    } catch (error) {
      console.log("get direct data error", error);
    }
	}
  return null;
};

export const saveDirectPath = (path = null, value = null) => {
  if (path) {
    try {
      const dataRef = FSTORE.ref(path);
      dataRef.set(value);
    } catch (error) {
      console.log("error saveDirectPath", error);
    }
  }
};

export const savePartialData = (path = null, payload = null) => {
  if (path && payload) {
    try {
      const dataRef = FSTORE.ref(path);

      dataRef.update(payload);
    } catch (error) {
      console.log("error saveDirectPath", error);
    }
  }
};

export const removeAnonymousData = (uid = null) => {
  if (uid) {
    try {
      const dataRef = FSTORE.ref("anonymous/" + uid);
      dataRef.remove();
    } catch (error) {
      console.log("error removeNodeDirect", error);
    }
  }
};

export const getServerTime = () => {
  try {
    let currentServerTime = getUnixTime().getTime();
    currentServerTime = currentServerTime / 1000;
    currentServerTime = Math.floor(currentServerTime);

    return currentServerTime;
  } catch (error) {
    let currentDate = new Date() / 1000;
    currentDate = Math.floor(currentDate);
    return currentDate;
  }
};

function formatUserData(currentData, newData) {
  // let provinceId = store.getState().globalState.province;
  // //  createdAt: float
  // //  notificationTokens: string
  // //  province: int
  // //  fbId: string
  // let params = {province: provinceId};
  // let currentDate = new Date() / 1000;
  // currentDate = Math.floor(currentDate);

  // if (currentData && typeof currentData["createdAt"] === "undefined") {
  //     params["createdAt"] = currentDate;
  // }

  // if (newData["token"]) {

  //     if (!currentData || typeof currentData["notificationTokens"] === "undefined") {
  //         params["notificationTokens"] = {
  //             [newData["token"]]: {
  //                 platform: platform
  //             }
  //         };
  //     } else {
  //         params["notificationTokens"] = {
  //             ...currentData["notificationTokens"],
  //             [newData["token"]]: {
  //                 platform: platform
  //             }
  //         };
  //     }
  // }

  // if (typeof newData["fbId"] !== "undefined") {
  //     params["fbId"] = newData["fbId"];
  // }

  // return params;
}

// get list comment
export const getListComment = (article_id) => {
  return new Promise((resolve, reject) => {
		const dataRef = FSTORE.ref(`articles/${article_id}/article_comments/`);
    dataRef.once("value",
      (snapshot) => {
        resolve(snapshot.val());
      },
      error => {
        reject(error);
      }
    );
  })
}
// add new comment
export const addNewComment = (article_id, comment) => {
  return new Promise((resolve, reject) => {
    const nodePath = `articles/${article_id}/article_comments/${comment.comment_id}`;
    const dataRef = FSTORE.ref(nodePath);
    dataRef.set(comment, (error) => {
      console.log('error', error)
      if (error) {
        reject({ status: 404 });
      } else {
        resolve({ status: 200 });
      }
    });
  })
}
// remove comment
export const removeComment = (article_id, comment_id) => {
  return new Promise((resolve, reject) => {
    const nodePath = `articles/${article_id}/article_comments/${comment_id}`;
    const dataRef = FSTORE.ref(nodePath);
    dataRef.remove(comment, (error) => {
      if (error) {
        reject({ status: 404 });
      } else {
        resolve({ status: 200 });
      }
    });
  })
}

// get list comment
export const getListReplyComment = (article_id, comment_id) => {
  return new Promise((resolve, reject) => {
		const dataRef = FSTORE.ref(`articles/${article_id}/article_comments/${comment_id}/reply_comments`);
    dataRef.once("value",
      (snapshot) => {
        resolve(snapshot.val());
      },
      error => {
        reject(error);
      }
    );
  })
}
//add new reply
export const addNewReplyComment = (article_id, comment_id, reply) => {
	return new Promise((resolve, reject) => {
		const nodePath = `articles/${article_id}/article_comments/${comment_id}/reply_comments/${reply.reply_id}`;
		const dataRef = FSTORE.ref(nodePath);
		dataRef.set(reply, (error) => {
			if (error) {
				reject({ status: 404 });
			} else {
				resolve({ status: 200 });
			}
		});
	})
}
// remove reply for comment
export const removeReplyComment = (article_id, comment_id, reply_id) => {
  return new Promise((resolve, reject) => {
    const nodePath = `articles/${article_id}/article_comments/${comment_id}/reply_comments/${reply_id}`;
    const dataRef = FSTORE.ref(nodePath);
    dataRef.remove(comment, (error) => {
      if (error) {
        reject({  status: 404 });
      } else {
        resolve({ status: 200 });
      }
    });
  })
}
