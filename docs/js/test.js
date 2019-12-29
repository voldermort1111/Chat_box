controller.addNewMember = async function(newFriendEmail){
    view.disable('add-new-member-btn')
    try {
      let signInMethods = await firebase.auth().fetchSignInMethodsForEmail(newFriendEmail)
      // nguoi dung co the dang nhap vao he thong >> email co ton tai
      if(signInMethods && signInMethods.length) {
        let newUser = newFriendEmail
        await firebase
          .firestore()
          .collection('conversations')
          .doc(model.currentConversation.id)
          .update({
            users: firebase.firestore.FieldValue.arrayUnion(newUser)
          })
        document.getElementById('new-friend-email-input').value = ''
      } else {
        throw new Error('Email do not exists!')
      }
    } catch(err) {
      view.setText('new-friend-email-error', err.message)
    }
    view.enable('add-new-member-btn')
}