import {
    backButton,
    swipeBehavior,
    closingBehavior,
    viewport,
    themeParams,
    miniApp,
    initData,
    $debug,
    init as initSDK,
    useSignal,
    isTMA,
    enableClosingConfirmation,
    disableVerticalSwipes,
    isVerticalSwipesEnabled
  } from '@telegram-apps/sdk-react';
  
  
  /**
   * Initializes the application and configures its dependencies.
   */
  export function init(debug: boolean): void {
    isTMA().then((v)=>{
      try {
      if(!v){
        return
      }
      // Set @telegram-apps/sdk-react debug mode.
      $debug.set(debug);
    
      // Initialize special event handlers for Telegram Desktop, Android, iOS, etc. Also, configure
      // the package.
      initSDK();
    
      // Mount all components used in the project.
      backButton.isSupported() && backButton.mount();
      closingBehavior.mount()
      miniApp.mount();
      enableClosingConfirmation()//关闭页面时弹窗询问
      
      themeParams.mount();
      swipeBehavior.mount();
      disableVerticalSwipes();//禁止上下滑动关闭页面
      setInterval(()=>{
        alert(isVerticalSwipesEnabled())
      },5000)
      initData.restore();
      viewport.mount().then(()=>{
        viewport.bindCssVars();
      }) .catch(e => {
        console.error('Something went wrong mounting the viewport', e);
      });
      // Define components-related CSS variables.
      miniApp.bindCssVars();
      themeParams.bindCssVars();
    
      // Add Eruda if needed.  tg调试console
      debug && import('eruda')
        .then((lib) => lib.default.init())
        .catch(console.error);
      
        
      }catch(err){
        console.log(err);

      }

    })
    
  }