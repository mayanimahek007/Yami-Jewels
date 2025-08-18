# Yaami Jewels - Token Login Feature

## Overview

This document explains the new token login feature implemented in the Yaami Jewels application. This feature allows users to log in directly using a JWT token and user data, bypassing the traditional login form.

## Features Added

1. **TokenLoginPage Component**: A new React component that processes token-based logins
2. **AuthContext Enhancement**: Added `tokenLogin` function to the authentication context
3. **Demo Pages**: Added HTML pages to demonstrate the token login functionality

## How It Works

### Token Login Flow

1. The user receives a JWT token and user data (typically from an external source or API)
2. The user navigates to `/token-login?token={TOKEN}&userData={ENCODED_USER_DATA}`
3. The `TokenLoginPage` component:
   - Extracts the token and userData from URL parameters
   - Parses the userData
   - Stores the token and user data using the `tokenLogin` function
   - Redirects to the appropriate page based on user role

### Demo Pages

1. **token-login-demo.html**: A simple demo page that allows you to test the token login feature
2. **api-demo.html**: A more comprehensive demo that includes:
   - Login API testing
   - Token login testing
   - API documentation

## Usage

### Direct Token Login

To log in a user directly with a token, navigate to:

```
/token-login?token={JWT_TOKEN}&userData={ENCODED_USER_DATA}
```

Where:
- `{JWT_TOKEN}` is a valid JWT token
- `{ENCODED_USER_DATA}` is a URL-encoded JSON string containing user data

### Using the Demo Pages

1. Open `/token-login-demo.html` in your browser
2. Click the "Login with Token" button to test the token login feature

OR

1. Open `/api-demo.html` in your browser
2. Use the tabs to explore different functionality:
   - "Login API" tab: Test the regular login API
   - "Token Login" tab: Test the token login feature
   - "API Documentation" tab: View API documentation

## Implementation Details

### Files Modified

1. `src/context/AuthContext.js`: Added `tokenLogin` function
2. `src/routes/allRoutes.js`: Added route for `TokenLoginPage`

### Files Created

1. `src/Pages/Auth/TokenLoginPage.js`: Component for handling token-based login
2. `public/token-login-demo.html`: Simple demo page
3. `public/api-demo.html`: Comprehensive API demo page

## Security Considerations

- The token login feature should only be used in secure contexts
- User data passed in the URL should be kept minimal to avoid security risks
- Consider implementing additional security measures such as token validation on the server side

## Future Enhancements

- Add expiration handling for tokens
- Implement refresh token functionality
- Add more robust error handling
- Enhance the demo pages with more features