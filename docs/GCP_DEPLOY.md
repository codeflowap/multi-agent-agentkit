## 🚀 Deploy to Google Cloud Run

### Prerequisites

- Google Cloud SDK installed (`gcloud`)
- Billing-enabled GCP project
- Enable Cloud Run + Artifact Registry

### Build and Deploy

```bash
# Authenticate and set project
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Enable APIs (only once)
gcloud services enable run.googleapis.com artifactregistry.googleapis.com

# Build container and push to Artifact Registry
gcloud builds submit --tag LOCATION-docker.pkg.dev/YOUR_PROJECT_ID/REPO_NAME/tomas-agentkit

# Deploy to Cloud Run
gcloud run deploy tomas-agentkit \
  --image=LOCATION-docker.pkg.dev/YOUR_PROJECT_ID/REPO_NAME/tomas-agentkit \
  --platform=managed \
  --region=us-central1 \
  --allow-unauthenticated \
  --port=3000
```

Replace:
- `YOUR_PROJECT_ID` with your actual GCP project ID
- `LOCATION` with a region (e.g., `us-central1`)
- `REPO_NAME` with your Artifact Registry repo