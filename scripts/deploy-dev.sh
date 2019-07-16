#!/bin/bash -e

PROJECT=da-dacm-dev
REPO=flink-ecosystem-demo
IMAGE="eu.gcr.io/${PROJECT}/${REPO}"
NAMESPACE=flink-ecosystem-demo
DEPLOYMENT=deployment.apps/flink-ecosystem-demo
CONTAINER=flink-ecosystem-demo

function get_image_tag() {
  echo "latest"
}

function set_up_gcloud() {
  gcloud --quiet auth activate-service-account --key-file $HOME/gcp-client-secret.json
  gcloud --quiet auth configure-docker
  gcloud --quiet config set project $PROJECT
}

function build_image() {
  local image_tag="$1"
  docker build -t "${IMAGE}:${image_tag}" .
}

function push_image() {
  local image_tag="$1"
  docker push "${IMAGE}:${image_tag}"
}

function get_gke_cluster_json() {
  local json="$(gcloud --quiet container clusters list --filter='resourceLabels.app:dacm' --format json)"
  if [ "$(echo "$json" | jq '. | length')" != "1" ]; then
    echo >&2 "fatal: more than one GKE cluster found!"
    exit 1
  fi

  echo "$json" | jq .[0]
}

function get_gke_cluster_name() {
  local json="$1"
  echo "$json" | jq -r .name
}

function get_gke_cluster_zone() {
  local json="$1"
  echo "$json" | jq -r .zone
}

function set_up_kubectl() {
  gke_cluster_json="$(get_gke_cluster_json)"
  gke_cluster_name="$(get_gke_cluster_name "$gke_cluster_json")"
  gke_cluster_zone="$(get_gke_cluster_zone "$gke_cluster_json")"
  gcloud --quiet container clusters get-credentials --zone "$gke_cluster_zone" "$gke_cluster_name"
}

function upgrade_deployment() {
  local image_tag="$1"

  # Since we're using image tag 'latest', updating the image won't start an
  # upgrade.
  #kubectl --namespace "$NAMESPACE" \
  #  set image "$DEPLOYMENT" \
  #  "$CONTAINER=${IMAGE}:${image_tag}"

  # Instead, update a label on the pod template.
  kubectl --namespace "$NAMESPACE" \
    patch "$DEPLOYMENT" \
    --patch "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"$(date +'%s')\"}}}}}"
}

image_tag="$(get_image_tag)"

set_up_gcloud
build_image "$image_tag"
push_image "$image_tag"

set_up_kubectl
upgrade_deployment "$image_tag"
