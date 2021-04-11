/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-02 16:13:00
 */
export const language = {
  beforeCreate() {
    this.$lang = this.$store.state.app.lang;
  }
};
