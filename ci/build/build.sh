#!/bin/bash
echo "开始创建镜像......................................................"

    echo "  步骤1: 下载npm依赖"
        cp ci/build/config/${CI_COMMIT_REF_NAME}.env.js config/prod.env.js
        npm install --registry=https://registry.npm.taobao.org
        npm run build
        if [ -d "ci/build/dist" ]; then
            rm -r ci/build/dist
        fi

    echo "  步骤2: 制作docker镜像"
        if [ "${CI_COMMIT_REF_NAME}" == "staging" ]; then
            sed -i 's|</body>|</body><script charset="utf-8" src="https://cdn.plugins.chilunyc.com/gear-demo-alert/gear-demo-alert-web.js"></script><script>GearDemoAlert.initialize({projectTrackCode:"'${FARM_TRACK_CODE}'",serverDomain:"https://farm.chilunyc.com"});</script>|g' dist/index.html
        fi
        
        mv dist ci/build/
        cd ci/build
        docker build -t $1 .

     echo "  步骤3: 上传镜像"
        {
            docker tag $1 internalacr.azurecr.cn/$1
            docker push internalacr.azurecr.cn/$1
        }||{
            echo -e "\033[5;31m ERROR：镜像创建失败！！！  \033[0m"
            echo -e "\033[31m 请参考以上执行结果查看问题 \033[0m"
            exit 1
        }

echo "创建镜像结束......................................................"
