
import { Button, Swipe, SwipeItem, Popup } from 'vant';

let plugins = [Button, Swipe, SwipeItem, Popup]

export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}

