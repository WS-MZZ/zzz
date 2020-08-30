#!/bin/bash


if [ "${CI_COMMIT_REF_NAME}" == "develop" ]; then export K8S_INGRESS_DOMAIN=${DOMAIN_DEVELOP}; export K8S_NAMESPACE=develop; fi;
if [ "${CI_COMMIT_REF_NAME}" == "staging" ]; then export K8S_INGRESS_DOMAIN=${DOMAIN_DEMO}; export K8S_NAMESPACE=demo; fi;

# 替换部署文件中的环境变量
sed -i 's/${project_name}/'${GROUP_NAME}-${PROJECT_NAME}'/g' ci/deploy/*
sed -i 's/${namespace}/'${K8S_NAMESPACE}'/g' ci/deploy/*
sed -i 's/${domain}/'${K8S_INGRESS_DOMAIN}'/g' ci/deploy/ingress.yaml
sed -i 's/${image_repository}/'${IMAGE_REPOSITORY}'/g' ci/deploy/deploy.yaml

{
    kubectl apply -f ci/deploy/deploy.yaml --kubeconfig=$HOME/.kube/config.aks
    kubectl apply -f ci/deploy/service.yaml --kubeconfig=$HOME/.kube/config.aks
    kubectl apply -f ci/deploy/ingress.yaml --kubeconfig=$HOME/.kube/config.aks
}||{
    echo -e "\033[5;31m ERROR：APPLY 失败！！！  \033[0m"
    echo -e "\033[31m 请参考以上执行结果查看问题 \033[0m"
    exit 1
}
echo "APPLY SUCCESS"
