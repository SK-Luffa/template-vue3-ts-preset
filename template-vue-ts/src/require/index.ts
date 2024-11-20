import rq from '../axios/index'


// 说明：这里我采取的是每一个请求的结果都需要自行处理，这样写会比较麻烦，并且没有针对请求成功后的错误结果进行处理，当然一般采用的都是http代码的处理方式
//实例 
export const sendSms = (parameter: string): Promise<any> => {

    return rq({
        url: '/a/b/c',//请求的代理路径
        method: 'post',//请求方式，一般get或者post
        param: {
            parameter//请求参数
        },
        onError: () => { }//请求失败结果处理
    })
}
