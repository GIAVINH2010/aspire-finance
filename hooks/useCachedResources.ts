import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "avenir-regular": require("../assets/fonts/AvenirNextLTPro-Regular.otf"),
          "avenir-medium": require("../assets/fonts/AvenirNextLTPro-Medium.otf"),
          "avenir-bold": require("../assets/fonts/AvenirNextLTPro-Bold.otf"),
          "avenir-demi-bold": require("../assets/fonts/AvenirNextLTPro-Demi.otf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
