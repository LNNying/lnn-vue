  function test() {
      // console.log('-------------------');
      console.log(1);
      // console.log('*******************');
      // 如果有返回值
      return 'AOP';
  }


  /**
   * 对于第一句和第三句 如果 抽离出去 并保持链式操作
   */


  Function.prototype.before = function (cb) {
      let __self__ = this;
      return function () {
          cb.apply(__self__, arguments);
          return __self__.apply(__self__, arguments);
      }
  };

  Function.prototype.after = function (cb) {
      let __self__ = this;
      return function () {
          const result = __self__.apply(__self__, arguments);
          cb.apply(__self__, arguments);
          return result;
      }
  };


  const res = test.before(() => {
      console.log('-------------------');
  }).after(() => {
      console.log('*******************');
  })();

  console.log(res);
