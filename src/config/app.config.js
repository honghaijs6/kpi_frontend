
export  const MAIN_COLOR = '#18A689';
export const ORDER_STATUS = [
    { code:0, icon:'fa-clock-o',color:'#C64333' ,name:'Chờ Duyệt', action:'Duyệt' },
    { code:1,icon:'fa-shopping-cart',color:'#00ACD7',name:'Đã Duyệt', action:'Xác nhận mua' },
    { code:2,icon:'fa-cube', color:'#0067A4',name:'Đã Xác Nhận Mua', action:'Lập xuất kho' },
    { code:3,icon:'fa-truck',color:'#16957B',name:'Đang Thi Công', action:'Hoàn tất' },   
    { code:4,icon:'fa-heart' ,color:'#DA8C10',name:'Đã Hoàn Tất',action:'Lập phiếu thu' },
    { code:5,icon:'fa-check',color:'#643BAD',name:'Kết thúc', action:'Kết húc' }       
];
export const DATE_FORMAT = 'yyyy-MM-dd';

export const PURCHASE_STATUS = [
    { code:0, icon:'fa-clock-o',color:'#C64333' ,name:'Đề xuất', action:'Duyệt' },
    { code:1,icon:'fa-shopping-cart',color:'#00ACD7',name:'Đã Duyệt', action:'Nhập hàng' },
    { code:2,icon:'fa-cube', color:'#0067A4',name:'Đã nhập', action:'Lập phiếu chi' },
    { code:3,icon:'fa-truck',color:'#16957B',name:'Đã chi', action:'' }

];