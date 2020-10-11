
const tokens = {
  admin: {
    id_token: 'admin-token'
  }
}

module.exports = [
  // user login
  {
    url: '/api/console/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return token
    }
  },

  // get user info
  {
    url: '/api/console/currentUser\.*',
    type: 'get',
    response: config => {
      return {
        username: 'testuser',
        logoUrl: 'https://chilunyc.com/media/prototypes/S3bZ4i3GXJLZWZct/images/%E9%A6%96%E9%A1%B5/u98.svg',
        accountNo: '12345',
        email: '12345@qq.com',
        mobilePhone: '123456789011',
        id: '1',
        workNo: '12334',
        englishName: 'jack',
        department: 'rd',
        role: ['admin']
      }
    }
  },
  {
    url: '/api/sysRole/allSysPermission',
    type: 'get',
    response: config => {
      return [1]
    }
  },
  // updateUserInfo
  {
    url: '/api/console/editUser',
    type: 'put',
    response: config => {
      return 'ok'
    }
  },

  // get verification code
  {
    url: '/api/console/email/sendCode',
    type: 'post',
    response: config => {
      return 'ok'
    }
  },

  // get verification code
  {
    url: '/api/console/forgotPassword',
    type: 'post',
    response: config => {
      return 'ok'
    }
  },

  // user logout
  {
    url: '/api/console/logout',
    type: 'post',
    response: _ => 'ok'
  },
  // user logout
  {
    url: '/api/console/updatePassword',
    type: 'put',
    response: _ => 'ok'
  }
]
