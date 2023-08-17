import { App } from 'vue'
import * as components from './components'

import './assets/css/theme.min.css';
import './assets/css/user.min.css';

export default {
    install: (app: App) => {
        for (const key in components) {
            // @ts-expect-error
            app.component(key, components[key])
        }
    }
}

export * from './components'
export * from './utils'