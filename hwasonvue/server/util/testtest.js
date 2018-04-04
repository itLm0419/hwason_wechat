/**
 * Created by Bright xia on 2017/7/15.
 */
function* get(x){
    var y=yield x+2;
    return y;

}

var g=gen(1);
g.next(1);
g.next(2);