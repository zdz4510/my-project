/**
 *  跳转到登录页面
 * to 要跳转的路径  如 /home
 * next  责任链模式
 */
import { TOKEN, DEVELOPMENT } from "@/constant";
import VueCookies from "vue-cookies";
export const toLogin = (from) => {
  if (window.NODE_ENV === DEVELOPMENT) {
    const fromUrl = `https://${window.host}/${from}`;
    window.location.href = `https://${window.host}/login?redirect=${fromUrl}`;
  } else {
    const fromUrl = `https://${window.host}/${from}`;
    window.location.href = `https://${window.SYS_WEB_HOST}/login?redirect=${fromUrl}`;
  }
};

/**
 *  删除掉等级的cookie
 */
export const clearToken = () => {
  //开发环境删除的是本地的cookie
  if (Window.NODE_ENV === DEVELOPMENT) {
    VueCookies.remove(TOKEN);
  } else {
    // 先上环境删除的是顶级的cookie
    VueCookies.remove(TOKEN, { domain: window.TOPLEVEL });
  }
};
/**
 *   设置顶级的cookie
 */
export const setToken = token => {
  //开发环境删除的是本地的cookie
  if (Window.NODE_ENV == "development") {
    VueCookies.set(TOKEN, token, { expires: "8h" });
  } else {
    // 先上环境删除的是顶级的cookie
    VueCookies.set(TOKEN, token, { expires: "8h", domain: window.TOPLEVEL });
  }
};

export const getToken = () => {
  //开发环境删除的是本地的cookie   默认path /
  if (Window.NODE_ENV == "development") {
    return  VueCookies.get(TOKEN);
  } else {
    // 先上环境删除的是顶级的cookie
    return  VueCookies.get(TOKEN, { domain: window.TOPLEVEL });
  }
};
