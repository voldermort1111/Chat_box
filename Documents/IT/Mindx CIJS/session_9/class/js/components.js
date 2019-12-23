const components = {}

// lưu tất cả nội dung html
components.register = `
<section class="register-container">
  <form id="register-form" class="register-form">
    <div class="form-header">
      <h3>Mindx chat</h3>
    </div>
    <div class="form-content">
      <div class="name-wrapper">
        <div class="input-wrapper">
          <input id="input-firstname" type="text" name="firstname" placeholder="Firstname">
          <div id="firstname-error" class="message-error"></div>
        </div>
        <div class="input-wrapper">
          <input type="text" name="lastname" placeholder="Lastname">
          <div id="lastname-error" class="message-error"></div>
        </div>
      </div>
      <div class="input-wrapper">
        <input type="email" name="email" placeholder="Email">
        <div id="email-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password">
        <div id="password-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="confirmPassword" placeholder="Confirm password">
        <div id="confirm-password-error" class="message-error"></div>
      </div>
    </div>
    <div id="register-error" class="message-error"></div>
    <div id="register-success" class="message-success"></div>
    <div class="form-footer">
      <a id="form-link" href="#">Already have an account? Login</a>
      <button id="register-btn" type="submit">Register</button>
    </div>
  </form>
</section>
`

components.logIn = `
<section class="log-in-container">
  <form id="log-in-form" class="log-in-form">
    <div class="form-header">
      <h3>Mindx chat</h3>
    </div>
    <div class="form-content">
      <div class="input-wrapper">
        <input type="email" name="email" placeholder="Email">
        <div id="email-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password">
        <div id="password-error" class="message-error"></div>
      </div>
    </div>
    <div id="log-in-error" class="message-error"></div>
    <div class="form-footer">
      <a id="form-link" href="#">Not yet have an account? Register</a>
      <button id="log-in-btn" type="submit">Log in</button>
    </div>
  </form>
</section>
`

components.nav = `
<nav class="main-nav">
  <div class="user-profile">
    <span id="user-email"></span>
    <button id="sign-out-btn" class="btn-icon"><i class="fas fa-sign-out-alt"></i></button>
  </div>
</nav>
`

components.chat = `
<section class="chat-container">
  <div class="aside-left">
    <div id="list-conversations" class="list-conversations">
    </div>
    <form id="form-add-conversation" class="form-add-conversation">
      <div class="input-wrapper">
        <input id="title-input" type="text" name="title" placeholder="Title">
        <div id="title-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input id="friend-email-input" type="email" name="friendEmail" placeholder="Enter your friend email..">
        <div id="friend-email-error" class="message-error"></div>
      </div>
      <button id="form-add-conversation-submit-btn" type="submit" class="btn-icon">
        <i class="fas fa-plus"></i>
      </button>
    </form>
  </div>
  <div class="current-conversation">
    <div id="list-messages" class="list-messages">
    </div>
    <form id="form-chat" class="form-chat">
      <div class="input-wrapper">
        <input id="message-input" type="text" name="message" placeholder="Enter your message">
      </div>
      <button id="form-chat-btn" type="submit">Send</button>
    </form>
  </div>
  <div class="aside-right">
    <div class="details-current-conversation">
      <div id="list-users" class="list-users">
      </div>
      <div id="created-at" class="created-at"></div>
    </div>
    <button id="leave-conversation-btn" class="btn-icon">
      <i class="fas fa-minus"></i>
    </button>
  </div>
</section>
`