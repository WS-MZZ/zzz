'use strict';
import Quill from 'quill'
var Embed = Quill.import('blots/block/embed');

function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}


class Video extends Embed {
    static create(value) {
        let node = super.create(value);
        node.setAttribute('src', value);
        node.setAttribute('controls', 'controls');
        node.setAttribute('type', "video/quicktime");
        return node;
    }
}


class FileUploaderForQuill {
    API_URL = undefined;
    UPLOAD_PATH = "/";
    quill = undefined

    typeStrings = {
        "video": "视频",
        "image": "图片"
    }

    constructor(quill, options) {
        this.API_URL = options.API_URL;
        this.UPLOAD_PATH = options.UPLOAD_PATH;
        this.quill = quill;

        Video.blotName = 'video'; //now you can use .ql-hr classname in your toolbar
        Video.className = 'ql-video';
        Video.tagName = 'video';

        Quill.register({
            'formats/video': Video
        });
    }

    isTypeValid(file, type) {
        if (type != "video" && type != "image") {
            throw type + " is not accepted type!"
        }
        var matcher = new RegExp("^" + type + "/");
        if (!matcher.test(file.type)) {
            throw "你只能上传" + this.typeStrings[type] ? this.typeStrings[type] : type
        }
    }

    /*
     * @param {string} url
     * @param {string} type
     */
    insertToEditor(url, type) {
        // push image url to rich editor.
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, type, url);
    }

    async gearUpload(file, type) {
        return new Promise((resolve, reject) => {
            /*组装上传请求*/
            const fd = new FormData();
            fd.append('file', file);
            const params = {
                "useUuid": true
            }
            const endpoint = this.API_URL + this.UPLOAD_PATH + '?' + encodeQueryData(params);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', endpoint, true);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    //const url = JSON.parse(xhr.responseText).data.url;
                    resolve(JSON.parse(xhr.responseText))
                }
            };

            xhr.send(fd);
        })
    }

    handle(type) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');

        // Listen upload local image and save to server
        input.onchange = () => {
            const file = input.files[0];
            this.isTypeValid(file, type);
            this.gearUpload(file, type)
                .then(res => {
                    /* 上传成功后插入到编辑器 */
                    console.log(res);
                    this.insertToEditor(res.data.url, type);
                }).catch(e => {
                    // eslint-disable-next-line no-console
                    console.log(e);
                });
        };

        input.click();

    }


}
export default FileUploaderForQuill;
