class ComboBoxParser extends ComWillCheck {
    constructor() {
        super(ExportType.ComboBox, /^ui[.](combobox)[.]/, null, "ComboBox");
    }
    /**
     * 用于处理下拉菜单
     */
    doParser(item: FlashItem, solution: Solution) {
        // 检查帧
        let timeline = item.timeline;
        let layers = timeline.layers;
        let llen = layers.length;
        let data = [];
        // 使用导出名作为key
        // 层名字为tf 放文本框或者留空
        // 层名字为bg 放3帧或者4帧图片
        for (let li = 0; li < llen; li++) {
            let layer = layers[li];
            let lname = layer.name;
            // 默认无文本框
            //data[0] = 0;
            if (lname === "tf") {
                let frame = layer.frames[0];
                let elements = frame.elements;
                let tf = elements[0];
                if (tf && tf.elementType === "text") {
                    data[0] = solution.getElementData(tf);
                }
            } else if (lname === "bg") {
                let frame = layer.frames[0];
                let elements = frame.elements;
                let ele = elements[0];
                if (ele && ele.elementType === "instance" && ele.instanceType === "symbol") {
                    data[1] = solution.getElementData(ele);
                }
            } else if (lname === "btn") {
                let frame = layer.frames[0];
                let elements = frame.elements;
                let ele = elements[0];
                if (ele && ele.elementType === "instance" && ele.instanceType === "symbol") {
                    data[2] = solution.getElementData(ele);
                }
            }
            else {
                Log.throwError("不支持这种combobox：", item.name);
            }
        }
        return data;
    }
}