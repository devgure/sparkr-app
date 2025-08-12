# Google & Apple OAuth Setup

## Google
1. Go to https://console.cloud.google.com/
2. Create OAuth 2.0 Client ID (Web + Android + iOS)
3. Set redirect URIs:
   - Web: `https://yourdomain.com/api/auth/google/callback`
   - Expo: `com.yourcompany.sparkr:/oauthredirect`
4. Add `GOOGLE_CLIENT_ID` to `.env`

## Apple
1. Go to https://developer.apple.com/account/
2. Create App ID + Services ID
3. Enable "Sign in with Apple"
4. Generate private key (.p8)
5. Set callback: `https://yourdomain.com/api/auth/apple/callback`
6. Add `APPLE_CLIENT_ID`, `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_PRIVATE_KEY` to `.env`
