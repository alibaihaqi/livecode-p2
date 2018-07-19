
const app = new Vue({
  el: '#app',
  data: {
    email: null,
    name: null,
    images: null,
    showImage: []
  },
  created: function () {
    this.getImage()
  },
  methods: {

    createUser: function () {
      console.log(this.email)
      console.log(this.name)

      axios.post('http://35.240.157.177/request-token', {
        name: this.name,
        email: this.email,
      })
        .then(function (User) {
          console.log(User)
          console.log('----------> masuk')
          localStorage.setItem('uuid', User.data.uuid)
        })

        .catch(function (err) {
          console.log(err)
        })
    },
    getImage: function () {
      let token = localStorage.getItem('uuid')

      axios.get('http://35.240.157.177/image',
        {
          headers: {
            authorization: token
          }
        })

        .then(result => {
         this.showImage = result.data
          console.log(this.showImage)
        })

        .catch(err => {
          console.log(err)
        })
    },
    handleImage: function (file) {
      console.log(file)
      this.image = file
    },
    uploadImage: function () {
      console.log(axios)
      let formData = new FormData()
      formData.append('file', this.image)
      console.log(formData)

      let token = localStorage.getItem('uuid')

      axios({
        url: 'http://35.240.157.177/image',
        method: 'post',
        data: formData,
        headers: {
          authorization: token
        }
      })
        .then( response =>
        { 
          console.log(response)
        })

        .catch( err => {
          console.log(err)
        })

    },

  }
})