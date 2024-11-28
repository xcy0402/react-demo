import { useNavigate } from 'react-router-dom';
import { backButton, swipeBehavior, useSignal} from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';

export function Page({ children, back = true }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    // sdk-react 2.0.4不报错 2.0.9报错
    try {
      if (back) {
        console.log(backButton);
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
    }catch(err){
      console.log(err);
    }
  }, [back, navigate]);


  return <>{children}</>;
}