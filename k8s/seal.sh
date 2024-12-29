cd ~/workspace/pk/przychodnia-pk/k8s/omed/base
kubeseal --scope cluster-wide <registry-secret.yaml >registry-sealed.json
kubeseal --scope cluster-wide <omed-env-secrets-secret.yaml >omed-env-secrets-sealed.json
cd ~/workspace/pk/przychodnia-pk/k8s/omed/overlays/omed-prod
kubeseal --scope cluster-wide <omed-env-secrets-secret.yaml >omed-env-secrets-sealed.json
cd ~/workspace/pk/przychodnia-pk/k8s/omed/overlays/omed-staging
kubeseal --scope cluster-wide <omed-env-secrets-secret.yaml >omed-env-secrets-sealed.json
