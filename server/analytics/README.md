# Portfolio Analytics server

Backend for GA4 property 428241957. The static GitHub Pages dashboard uses its existing Firebase login. Google Analytics is read on the server with Application Default Credentials; no private key, refresh token or client secret belongs in this repository.

## Cloud prerequisites

Cloud Run requires an active billing account. Its free tier is not a guarantee of zero cost; source builds and Artifact Registry can also incur costs. Do not enable billing or deploy without the owner's approval.

1. Choose the Google Cloud project where this service will run. Enable Cloud Run, Cloud Build, Artifact Registry, and Google Analytics Data API.
2. Create a dedicated service account named `portfolio-analytics`. Do not download a JSON key.
3. In Analytics > Admin > Property access management for property 428241957, add that service account email with Viewer only.
4. In Firebase project `vien-portfolio` > Authentication > Users, copy the UID of the existing dashboard admin.
5. Grant the runtime service account Firebase Authentication Viewer (`roles/firebaseauth.viewer`) on `vien-portfolio`. This is required for revoked/disabled-session checks; the service also verifies the Firebase JWT's project/signature.
6. Follow Google's Cloud Run source deployment prerequisites for the deployer and build service account: https://cloud.google.com/run/docs/deploying-source-code

## Deploy from Cloud Shell

Clone this repository in Cloud Shell and enter `server/analytics`.
Set the following values deliberately (neither is a secret):

```sh
ANALYTICS_CLOUD_PROJECT='YOUR_CLOUD_PROJECT_ID'
ANALYTICS_ADMIN_UID='YOUR_FIREBASE_ADMIN_UID'
ANALYTICS_RUNTIME_SA="portfolio-analytics@${ANALYTICS_CLOUD_PROJECT}.iam.gserviceaccount.com"

gcloud run deploy portfolio-analytics \
  --project="$ANALYTICS_CLOUD_PROJECT" \
  --region=asia-southeast1 \
  --source=. \
  --service-account="$ANALYTICS_RUNTIME_SA" \
  --allow-unauthenticated \
  --min=0 --max=1 --concurrency=20 --memory=256Mi --cpu=1 --timeout=40 \
  --set-env-vars="FIREBASE_PROJECT_ID=vien-portfolio,GA_PROPERTY_ID=428241957,ADMIN_UIDS=$ANALYTICS_ADMIN_UID,DASHBOARD_ORIGIN=https://viennguyencong.id.vn"
```

The Cloud Run URL is publicly reachable so browser requests can arrive; application code rejects unauthenticated users and all Firebase UIDs outside ADMIN_UIDS before fetching or returning reports. CORS is not used as authentication.

Paste the returned HTTPS `…run.app` origin (without a path) into Dashboard > Thống kê truy cập > Địa chỉ máy chủ thống kê. Select “Lưu và dùng kết nối tự động”.

The dashboard will load fresh reports automatically whenever this section opens. API results are cached for 60 seconds on each server instance to reduce requests. The browser never receives Google credentials. Old browser OAuth remains available only when the server URL is blank.

## Validate after deployment

- GET /reports without Authorization must return 401.
- A signed-in non-admin Firebase user must receive 403.
- The configured admin must see reports without a Google popup after a page reload.
- Logging out must clear the on-screen report and reject new requests.
- Check the Cloud Run logs for configuration errors; never log bearer tokens.

## Local tests

`npm test` tests authorization, CORS rejection, ranges, cache expiry, and partial failures without Google credentials.
