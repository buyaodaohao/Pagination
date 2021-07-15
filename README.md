# Pagination
一个适用于移动端和PC端的React翻页组件
此组件接收2个参数，
1.pageCount: number; //总页数，总页数小于或等于8时，页码完全展示
2.tapSelectOnePage: (selectPage: number) => void; //选中某一页触发
第二个参数其实是一个函数回调，用户在切换页码的时候会触发，也就回回传给组件使用处，方便做数据处理。
例：

    function _didSelectOnePage(page: number) {
        console.log("用户点击了第" + page + "页");
        
    }
    
    
    
    
   
 调用方法    

#
<PageComponent  pageCount={12}  tapSelectOnePage={_didSelectOnePage}></PageComponent>
#
