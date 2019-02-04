// if ($("#flashPlayer").append('<div id="nctPlayer"></div>')) {
//     var player = new NCTPlayer();
//     $(document).ready(function() {
//         player.peConfig.width = width;
//         player.peConfig.height = height;
//         player.peConfig.autoPlay = true;
//         player.peConfig.isExpand = false;
//         player.peConfig.expandStatus = true;
//         player.peConfig.videoEndShowRecommend = true;
//         player.peConfig.pushGAPercent = trackingPrecentGA([], "bPlblM0LyNNcT");
//         player.peConfig.pushURLPercent = trackingPrecentURL([], "bPlblM0LyNNcT");
//         player.peConfig.pushGASecond = trackingSecondGA([], "bPlblM0LyNNcT");
//         player.peConfig.pushURLSecond = trackingSecondURL([], "bPlblM0LyNNcT");
//         player.peConfig.IMAUrl = "";
//         player.peConfig.IMASecond = "";
//         player.openAdvPreroll = true;
//         player.peConfig.xmlURL = "https://www.nhaccuatui.com/flash/xml?key3=1d5b21a90cf342f0e06ac8a0ac606f3f&html5=true&listKey=";
//         player.load("nctPlayer");
//     });
// }

const data = [
    {
        html: 'https://www.nhaccuatui.com/video/nu-cuoi-man-khac-viet.bPlblM0LyNNcT.html',
        video: 'https://vredir.nixcdn.com/PreNCT15/NuCuoiMan-KhacViet-5831902.mp4?st=RYs3qpKv0yCZd6VAAsJStw&e=1549292039&t=1549205640043'
    },
    {
        html: 'https://www.nhaccuatui.com/video/lieu-anh-co-the-yeu-em-khac-viet.XvA1CQIf7lyjm.html',
        video: 'https://vredir.nixcdn.com/PreNCT14/LieuAnhCoTheYeuEm-KhacViet-5525482.mp4?st=Lh7SOMWHrYTB1odempQrOw&e=1549292179&t=1549205779389'
    },
    {
        html: 'https://www.nhaccuatui.com/video/yeu-nham-nguoi-khac-viet.zs2hOCTBsG5ox.html',
        video: 'https://vredir.nixcdn.com/PreNCT14/YeuNhamNguoi-KhacViet-5402628.mp4?st=NLZ90cgM0hQLLDmX10wmLw&e=1549292262&t=1549205862701'
    }, {
        html: 'https://www.nhaccuatui.com/video/ngay-cuoi-khac-viet.yHfqTeZIcQom8.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/NgayCuoi-KhacViet-4701740.mp4?st=dlU-vgN1EumWHysGcDGZpA&e=1549292303&t=1549205903097'
    }, {
        html: 'https://www.nhaccuatui.com/video/anh-yeu-em-khac-viet.jzgp89W7mTxXU.html',
        video: 'https://vredir.nixcdn.com/PreNCT13/AnhYeuEm-KhacViet-4816371.mp4?st=2zf9lLUmw2FCN9ug011EJQ&e=1549292346&t=1549205946202'
    }, {
        html: 'https://www.nhaccuatui.com/video/yeu-khac-viet.3GdhrE3kpXnEk.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/Yeu-KhacViet-4526627.mp4?st=LlpXG5zcF0T0e-Cqy3kCWw&e=1549292374&t=1549205974762'
    }, {
        html: 'https://www.nhaccuatui.com/video/toi-cho-co-gai-do-khac-viet.eWxi3QVqqHrJX.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/ToiChoCoGaiDo-KhacViet-4549126.mp4?st=EpB4lMemhAKGKU3ubTgpJg&e=1549292406&t=1549206006541'
    }, {
        html: 'https://www.nhaccuatui.com/video/khi-con-la-nha-khi-con-la-nha-ost-khac-viet.YjaWEV6u6jJSX.html',
        video: 'https://vredir.nixcdn.com/PreNCT14/KhiConLaNhaKhiConLaNhaOST-KhacViet-5309585.mp4?st=oDopIJko2RLR8dw-oUUHNQ&e=1549292455&t=1549206056173'
    }, {
        html: 'https://www.nhaccuatui.com/video/muon-noi-khac-viet.MTjoB9bNrBkOu.html',
        video: 'https://vredir.nixcdn.com/PreNCT13/MuonNoi-KhacViet-5166183.mp4?st=HTbFFjalZ29NCq_T7BVuNg&e=1549292504&t=1549206104756'
    }, {
        html: 'https://www.nhaccuatui.com/video/yeu-phim-ngan-khac-viet.eJGyuq0bpiXCT.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/YeuPhimNgan-KhacViet-4525558.mp4?st=gzyevrqjnpuLXn3JzDM04A&e=1549292537&t=1549206137800'
    }, {
        html: 'https://www.nhaccuatui.com/video/khong-yeu-cung-dung-lam-ban-khac-viet.nXVI9VCBD1KMt.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/KhongYeuCungDungLamBan-KhacViet-4558716.mp4?st=zXEUbEsRJxWkNuY3fDrDZQ&e=1549292598&t=1549206198349'
    }, {
        html: 'https://www.nhaccuatui.com/video/em-lam-gi-toi-nay-khac-viet.MbbhitAkWo5rj.html',
        video: 'https://vredir.nixcdn.com/PreNCT9/EmLamGiToiNay-KhacViet-3602536.mp4?st=c3Imo9Yk2mNKs4SeZ-Y48Q&e=1549292620&t=1549206220250'
    }, {
        html: 'https://www.nhaccuatui.com/video/em-cu-di-di-khac-viet.MJ5yQDapxNZmJ.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/EmCuDiDi-KhacViet-4499587.mp4?st=V4b_qKVorHUCK_YCNMarBg&e=1549292854&t=1549206454549'
    }, {
        html: 'https://www.nhaccuatui.com/video/nguoi-tinh-khac-viet-ft-le-hieu.yNeiOntEeX0dT.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/NguoiTinh-KhacVietLeHieu-4528405.mp4?st=33Xf6LU6wrp4zAegCkWQsg&e=1549292868&t=1549206468949'
    }, {
        html: 'https://www.nhaccuatui.com/video/tu-bo-khac-viet.SJxKnshfgzUuf.html',
        video: 'https://vredir.nixcdn.com/GoNCT1/TuBo-KhacViet-4851279.mp4?st=oQlkNSG2ZWEeR88AvT6_5w&e=1549292922&t=1549206522748'
    }, {
        html: 'https://www.nhaccuatui.com/video/vi-hanh-phuc-cua-em-khac-viet-ft-vu-duy-khanh.hqfwjIostAKuz.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/ViHanhPhucCuaEm-KhacViet-4591830.mp4?st=0xqA_u2Uk6AFUGe4_mkvLA&e=1549292960&t=1549206560263'
    }, {
        html: 'https://www.nhaccuatui.com/video/tu-bo-anh-yeu-em-phan-2-phim-ca-nhac-khac-viet.7CNu40bkokVB1.html',
        video: 'https://vredir.nixcdn.com/PreNCT13/TuBoAnhYeuEmPhan2PhimCaNhac-KhacViet-4851018.mp4?st=VP5NXtz51RnWZ-_Xi_YXGA&e=1549292987&t=1549206587984'
    }, {
        html: 'https://www.nhaccuatui.com/video/ta-se-quen-khac-viet.APU5Wzjdk0TV4.html',
        video: 'https://vredir.nixcdn.com/PreNCT11/TaSeQuen-KhacViet-4267345.mp4?st=wYSbVyC9setGK0rZkgaKAQ&e=1549293012&t=1549206612755'
    }, {
        html: 'https://www.nhaccuatui.com/video/biet-noi-la-tai-sao-khac-viet.pDsAA2EgNdfhh.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/BietNoiLaTaiSao-KhacViet-4542789.mp4?st=t6jei0x8wrtmVPMzgwIG2Q&e=1549293033&t=1549206633514'
    }, {
        html: 'https://www.nhaccuatui.com/video/tu-bo-anh-yeu-em-phan-1-phim-ca-nhac-khac-viet.GrWPdxXdBaXad.html',
        video: 'https://vredir.nixcdn.com/PreNCT13/TuBoAnhYeuEmPhan1PhimCaNhac-KhacViet-4813765.mp4?st=fWf0RrO0EGVCI7m1I5j45A&e=1549293060&t=1549206660645'
    }, {
        html: 'https://www.nhaccuatui.com/video/anh-yeu-nguoi-khac-roi-khac-viet.i3ii9q30l7jq4.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/AnhYeuNguoiKhacRoi-KhacViet-4608517.mp4?st=VCGdz5RfAo29jtX0ro-XeA&e=1549293087&t=1549206687846'
    }, {
        html: 'https://www.nhaccuatui.com/video/anh-khac-hay-em-khac-dvd-mat-cam-giac-yeu-phan-1-khac-viet.oxDza0HxoeN7.html',
        video: 'https://vredir.nixcdn.com/PreNCT2/AnhKhacHayEmKhacDVDMatCamGiacYeuPhan1-KhacViet_bbz.mp4?st=XAh-XMNc7QYoNqHRisrm_A&e=1549293168&t=1549206768747'
    }, {
        html: 'https://www.nhaccuatui.com/video/neu-em-con-ton-tai-cover-khac-viet.Z2zmo6gobpawy.html',
        video: 'https://vredir.nixcdn.com/SongClip31/NeuEmConTonTaiCover-KhacViet-4663534.mp4?st=zgiMqFmIAYY2aCVxkRppxA&e=1549293224&t=1549206824366'
    }, {
        html: 'https://www.nhaccuatui.com/video/nguoi-co-don-khac-viet.vggm50i5D6O6P.html',
        video: 'https://vredir.nixcdn.com/PreNCT4/NguoiCoDon-KhacViet_fdk.mp4?st=qphYufW_DjYSdS2j3E6rbQ&e=1549293263&t=1549206863470'
    }, {
        html: 'https://www.nhaccuatui.com/video/den-khi-nao-khac-viet.zFde6efNWfQeF.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/DenKhiNao-KhacViet-4556785.mp4?st=tWLKv2jtl7Dkx1m3TzRrIw&e=1549293279&t=1549206879899'
    }, {
        html: 'https://www.nhaccuatui.com/video/cuoi-cung-khac-viet.C33NlJeBKkc0F.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/CuoiCung-KhacViet-4610233.mp4?st=Ht5wy5XBziz5ak1W44gtsQ&e=1549293334&t=1549206934518'
    }, {
        html: 'https://www.nhaccuatui.com/video/yeu-nham-nguoi-karaoke-khac-viet.GCxzgqkVMTZJY.html',
        video: 'https://vredir.nixcdn.com/PreNCT14/YeuNhamNguoiKaraoke-KhacViet-5453218.mp4?st=LGRkpOmhd44Qd89rzgFOrg&e=1549293372&t=1549206972678'
    }, {
        html: 'https://www.nhaccuatui.com/video/anh-muon-quay-lai-khac-viet.Dw5iteVOEszn3.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/AnhMuonQuayLai-KhacViet-4558434.mp4?st=YOtiBHp78QnnDRyZDdKltw&e=1549293386&t=1549206986424'
    }, {
        html: 'https://www.nhaccuatui.com/video/nguoi-khong-dang-khac-viet.lXsTP6shbYjxn.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/NguoiKhongDang-KhacViet-4549162.mp4?st=V_XBZSv8SLu1DxHkANe-Gw&e=1549293418&t=1549207018635'
    }, {
        html: 'https://www.nhaccuatui.com/video/loi-hua-nam-cuong-ft-khac-viet.z6gfo1CtqgR5.html',
        video: 'https://vredir.nixcdn.com/PreNCT1/LoiHua-NamCuong-KhacViet_bs6.mp4?st=uSb9nP2EaLcXKDlU8AH_EQ&e=1549293440&t=1549207040690'
    }, {
        html: 'https://www.nhaccuatui.com/video/hoi-tham-nhau-lyric-video-khac-viet.J92l6Oz3AW1Iz.html',
        video: 'https://vredir.nixcdn.com/PreNCT13/HoiThamNhauLyricVideo-KhacViet-4935521.mp4?st=CqLfw_EitXsHT1ul-qob1g&e=1549293462&t=1549207062850'
    }, {
        html: 'https://www.nhaccuatui.com/video/ngay-cuoi-karaoke-khac-viet-ft-huong-tram.lsqrXYLC54EVj.html',
        video: 'https://vredir.nixcdn.com/PreNCT12/NgayCuoiKaraoke-KhacVietHuongTram-4644674.mp4?st=gatD5T6V0lVSHo11fkZygw&e=1549293483&t=1549207083342'
    }, {
        html: 'https://www.nhaccuatui.com/video/cuoi-cung-ca-ra-o-ke-khac-viet-ft-ca-de-dai.5LqAbIErMOuQK.html',
        video: 'https://vredir.nixcdn.com/PreNCT10/CuoiCungCaRaOKe-KhacVietCaDeDai-3974214.mp4?st=DOkkX_tFOgVN2N9okmNjAg&e=1549293514&t=1549207114705'
    }, {
        html: 'https://www.nhaccuatui.com/video/chi-anh-hieu-em-phan-2-khac-viet.n4Mt7Oj47q8z.html',
        video: 'https://vredir.nixcdn.com/PreNCT2/ChiAnhHieuEmPhan2-KhacViet_99m.mp4?st=cSAlBk3lBqZYyuhFtlg3aA&e=1549293599&t=1549207199399'
    }, {
        html: 'https://www.nhaccuatui.com/video/chuyen-ngay-hom-qua-tra-my-idol-ft-khac-viet.OH0uGzu7xQdyS.html',
        video: 'https://vredir.nixcdn.com/PreNCT5/ChuyenNgayHomQua-TraMyIdolKhacViet-2647532.mp4?st=sFpNVuD964-sW0LdkVzy4A&e=1549293620&t=1549207221006'
    }, {
        html: 'https://www.nhaccuatui.com/video/de-trai-tim-nghi-ngoi-lyrics-video-khac-viet.PbIqbqQ9XUkyX.html',
        video: 'https://ds-vn.serving-sys.com/BurstingRes/Site-43749/Type-16/13ad6952-daa7-46e5-8c8f-afb087aeef8b.mp4'
    }, {
        html: 'https://www.nhaccuatui.com/video/toi-cho-co-gai-do-ca-ra-o-ke-khac-viet-ft-ca-de-dai.Pg3BY0izgiGZJ.html',
        video: 'https://vredir.nixcdn.com/PreNCT10/ToiChoCoGaiDoCaRaOKe-KhacVietCaDeDai-4099228.mp4?st=QzbstzxOe3BhSWwSIm7gig&e=1549293743&t=1549207343059'
    }, {
        html: 'https://www.nhaccuatui.com/video/trach-ai-bay-gio-cover-khac-viet.fyMavAzuCciGl.html',
        video: 'https://vredir.nixcdn.com/SongClip33/TrachAiBayGioCover-KhacViet-5017803.mp4?st=F1seqyt-ROcg4suqQ6pBiw&e=1549293768&t=1549207368184'
    },
    {
        html: 'https://www.nhaccuatui.com/video/anh-nhan-ra-khac-viet.327kqIbP2wgX.html',
        video: 'https://vredir.nixcdn.com/PreNCT3/AnhNhanRa-KhacViet_339.mp4?st=hJZiSfQytvEkzpZZHkOvOw&e=1549293824&t=1549207424242'
    },
    {
        html: 'https://www.nhaccuatui.com/video/anh-can-em-dvd-mat-cam-giac-yeu-phan-3-khac-viet.NKL0ppnXFLsD.html',
        video: 'https://vredir.nixcdn.com/PreNCT2/AnhCanEmDVDMatCamGiacYeuPhan3-KhacViet_97j.mp4?st=-BLTpBbb28hWu3_fQVdnuQ&e=1549293849&t=1549207449762'
    },
]

export default data