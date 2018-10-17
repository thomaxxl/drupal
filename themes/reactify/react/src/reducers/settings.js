import {
  THEME_SETTINGS,
  LOAD_DASHBOARD_STATS,
  START,
  SUCCESS,
  FAIL, SET_LANG, INVERSE_THEME_COLOR
} from '../constants'

export default (settingsState = {
  loading: false,
  loaded: false,
  showNotificationBar: false,
  language: 'en',
  dashboard: {
    inversedColor: false,
    dashboardStats: {
      enabled: false,
      loading: false,
      loaded: false,
      stats: []
    }
  },
  layout: {
    showHeader: true,
    showFooter: true,
    showSidebar: true,
    showBanner: true,
    sidebarPosition: 'left'
  },
  text: {
    footerText: ''
  }
}, action) => {
  const { type, response, inversedColor, lang } = action
  switch (type) {
    case THEME_SETTINGS + SUCCESS:
      return {...settingsState, ...response}

    case 'TOGGLE_NOTIFICATION_BAR':
      return {
        ...settingsState,
        showNotificationBar: !settingsState.showNotificationBar
      }

    case LOAD_DASHBOARD_STATS + START:
      return {
        ...settingsState,
        loading: true,
        dashboard: {
          ...settingsState.dashboard,
          dashboardStats: {
            ...settingsState.dashboard.dashboardStats,
            loading: true,
            loaded: false
          }
        }
      }

    case LOAD_DASHBOARD_STATS + SUCCESS:
      return {
        ...settingsState,
        loading: false,
        loaded: true,
        dashboard: {
          ...settingsState.dashboard,
          dashboardStats: {
            ...settingsState.dashboard.dashboardStats,
            stats: response,
            loading: false,
            loaded: true
          }
        }
      }

    case LOAD_DASHBOARD_STATS + FAIL:
      return {
        loading: false,
        loaded: false,
        ...settingsState,
        dashboard: {
          ...settingsState.dashboard,
          dashboardStats: {
              ...settingsState.dashboard.dashboardStats,
              loading: false,
              loaded: false
          }
        }
      }

    case SET_LANG:
      return {
        ...settingsState,
        language: lang
      }

    case INVERSE_THEME_COLOR:
      return {
          ...settingsState,
          dashboard: {
              ...settingsState.dashboard,
            inversedColor: inversedColor
          }
      }
  }

  return settingsState
}
