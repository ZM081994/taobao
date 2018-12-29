var btn = document.querySelector(".btn");
var inp = document.querySelector(".inp");
var wrapBox = document.getElementById("wrapBox");
// var scroll = new BScroll("#section", {
//     scrollY: true
// })
inp.addEventListener("input", function() {
    var val = inp.value;
    if (val) {
        ajax({
            url: "/api/shopping?name=" + val,
            dataType: "json",
            success: function(data) {
                var str = "";
                if (data.code === 1) {
                    data.msg.forEach(function(file) {
                        str += `<dl>
                                    <dt><img src="images/${file.img}" alt=""></dt>
                                    <dd>
                                        <h3>${file.shop}</h3>
                                        <span>${file.price}</span>
                                    </dd>
                                </dl>`
                    });

                    wrapBox.innerHTML = str;
                }
            }
        })
    }
})