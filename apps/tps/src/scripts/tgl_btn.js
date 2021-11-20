function toggleFix(elem) {
    if (elem.dataset.tglStatus === 'fix') return elem.dataset.tglStatus = 'stv'
    else return elem.dataset.tglStatus = 'fix'
}

function make_img(image) {
    let $img = document.createElement('img');
    $img.src = image.src;
    $img.style.height = image.height;
    $img.style.width = image.width;
    $img.classList.add('tps_img')
    return $img

}
const $tgl_box = document.querySelector('div.tgl_box');

// $tgl_box.addEventListener('click', function() {
//     let status = document.querySelector('.tgl_thumb').dataset.tglStatus;
//     if (!status) return
//     const $box = document.querySelector('.tgl_box');
//     const $img = document.querySelector('.tps_img');
//     // console.log(target);
//     // const $stv = document.querySelector('.tgl_box');
//     if (status == 'stv') {
//         document.querySelector('.tgl_thumb').dataset.tglStatus = 'fix';
//         $box.classList.remove('stv_bg');
//         $box.classList.add('fix_bg');
//     } else {
//         document.querySelector('.tgl_thumb').dataset.tglStatus = 'stv';
//         $box.classList.add('stv_bg');
//         $box.classList.remove('fix_bg');
// 
//     }
// 
// 
// })