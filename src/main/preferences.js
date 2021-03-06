import storage from 'electron-json-storage'
import objectAssignDeep from 'object-assign-deep'

const Base = {
  general: {
    sound: {
      fav_rb: true,
      toot: true
    },
    theme: 'white',
    fontSize: 14,
    displayNameStyle: 0
  }
}

export default class Preferences {
  constructor (path) {
    this.path = path
    this.data = Base
  }

  async load () {
    try {
      const preferences = await this.get()
      return objectAssignDeep({}, Base, preferences)
    } catch (err) {
      return Base
    }
  }

  get () {
    return new Promise((resolve, reject) => {
      storage.get(this.path, (err, data) => {
        if (err) return reject(err)
        this.data = data
        return resolve(data)
      })
    })
  }

  save (data) {
    return new Promise((resolve, reject) => {
      storage.set(this.path, data, (err) => {
        if (err) return reject(err)
        this.data = data
        return resolve(data)
      })
    })
  }
}
