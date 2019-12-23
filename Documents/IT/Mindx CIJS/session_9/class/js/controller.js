const controller = {}

controller.initAuth = function() {
  firebase.auth().onAuthStateChanged(authStateChangeHandler)

  function authStateChangeHandler(user) {
    if(user && user.emailVerified) {
      view.showComponent('chat')
    } else {
      view.showComponent('logIn')
    }
  }
}

// synchronous - asynchronous in javascript
// callback - Promise - async/await
// async/await
controller.register = async function(registerInfo) {
  // 1. tao user
  // 2. update name for user
  // 3. send email confirm
  let email = registerInfo.email
  let password = registerInfo.password
  let displayName = registerInfo.firstname + " " + registerInfo.lastname
  view.setText('register-error', '')
  view.setText('register-success', '')
  view.disable('register-btn')
  
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    await firebase.auth().currentUser.updateProfile({
      displayName: displayName
    })
    await firebase.auth().currentUser.sendEmailVerification()
    view.setText('register-success', 'An verification email has been sent to your email address!')
  } catch(err) {
    view.setText('register-error', err.message)
  }
  view.enable('register-btn')
}

controller.logIn = async function(logInInfo) {
  try {
    let email = logInInfo.email
    let password = logInInfo.password
    view.disable('log-in-btn')

    let result = await firebase.auth().signInWithEmailAndPassword(email, password)
    if(result.user && result.user.emailVerified) {
      // view.enable('log-in-btn')
      // alert('Log in success!')
      view.showComponent('chat')
    } else {
      throw new Error('Must verified email!')
    }
  } catch(err) {
    view.enable('log-in-btn')
    view.setText('log-in-error', err.message)
  }
}

controller.loadConversations = async function() {
  let result = await firebase
    .firestore()
    .collection('conversations')
    .where('users', 'array-contains', firebase.auth().currentUser.email)
    .get()
  let conversations = []
  for(let doc of result.docs) {
    conversations.push(transformDoc(doc))
  }
  model.saveConversations(conversations)
  if(conversations.length) {
    model.saveCurrentConversation(conversations[0])
  }
  view.showCurrentConversation() // model.currentConverstion
  view.showListConversations() // model.conversations
}

controller.addMessage = async function(messageContent) {
  if(messageContent && model.currentConversation) {
    let message = {
      content: messageContent,
      owner: firebase.auth().currentUser.email,
      createdAt: new Date().toISOString()
    }
    view.disable('form-chat-btn')

    await firebase
      .firestore()
      .collection('conversations')
      .doc(model.currentConversation.id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      })
    document.getElementById('message-input').value = ''
    view.enable('form-chat-btn')
  }
}

controller.setupOnSnapshot = function() {
  let isFirstTimeRun = true
  firebase
    .firestore()
    .collection('conversations')
    .where('users', 'array-contains', firebase.auth().currentUser.email)
    .onSnapshot(snapshotHandler)

  function snapshotHandler(snapshot) {
    // bo qua lan chay dau tien
    if(isFirstTimeRun) {
      isFirstTimeRun = false
      return
    }
    // kiem tra thay doi tu database
    for(let docChange of snapshot.docChanges()) {
      if(docChange.type == 'modified') {
        let conversation = transformDoc(docChange.doc)
        model.updateConversation(conversation)
        if(model.currentConversation && model.currentConversation.id == conversation.id) {
          view.showCurrentConversation()
        }
      }
      if(docChange.type == 'added') {
        let conversation = transformDoc(docChange.doc)
        model.updateConversation(conversation)
      }
      if(docChange.type == 'removed') {
        let conversation = transformDoc(docChange.doc)
        model.removeConversation(conversation)
        if(model.currentConversation && model.currentConversation.id == conversation.id) {
          view.clearCurrentConversation()
          if(model.conversations && model.conversations.length) {
            model.saveCurrentConversation(model.conversations[0])
            view.showCurrentConversation()
          }
        }
      }
    }
    view.showListConversations()
  }
}

controller.addConversation = async function(title, friendEmail) {
  view.disable('form-add-conversation-submit-btn')
  try {
    let signInMethods = await firebase.auth().fetchSignInMethodsForEmail(friendEmail)
    // nguoi dung co the dang nhap vao he thong >> email co ton tai
    if(signInMethods && signInMethods.length) {
      let conversation = {
        title,
        createdAt: new Date().toISOString(),
        messages: [],
        users: [
          firebase.auth().currentUser.email,
          friendEmail
        ]
      }
      await firebase
        .firestore()
        .collection('conversations')
        .add(conversation)
      document.getElementById('title-input').value = ''
      document.getElementById('friend-email-input').value = ''
    } else {
      throw new Error('Email do not exists!')
    }
  } catch(err) {
    view.setText('friend-email-error', err.message)
  }
  view.enable('form-add-conversation-submit-btn')
}

controller.leaveConversation = async function() {
  if(model.currentConversation) {
    let currentEmail = firebase.auth().currentUser.email
    let conversationId = model.currentConversation.id

    await firebase
      .firestore()
      .collection('conversations')
      .doc(conversationId)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove(currentEmail)
      })
  }
}

function transformDoc(doc) {
  let data = doc.data()
  data.id = doc.id
  return data
}
