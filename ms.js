/*
1. Render songs
2. Scroll top
3. Play / pause / seek
4. CD rotate
5. Next / prev
6. Random
7. Next / repeat when ended
8. Active song
9. Scroll active song into view
10. Play song when click
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playlist')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [{
            name: 'Gặp Nhưng Không Ở Lại',
            singer: 'Hiền Hồ ft Quân AP',
            path: './music/GapNhungKhongOLai.mp3',
            image: './image/GapNhungKhongOLai.jpg'
        },
        {
            name: 'Nàng Thơ',
            singer: 'Hoàng Dũng',
            path: './music/NangTho.mp3',
            image: './image/NangTho.jpg'
        },
        {
            name: 'Thiên Đàng',
            singer: 'Wowy ft Loli',
            path: './music/ThienDang.mp3',
            image: './image/ThienDang.jpg'
        },
        {
            name: 'Thế Thái',
            singer: 'Hương Ly',
            path: './music/TheThai.mp3',
            image: './image/TheThai.jpg'
        },
        {
            name: 'Sao Anh Chưa Về Nhà',
            singer: 'Amee',
            path: './music/SaoAnhChuaVeNha.mp3',
            image: './image/SaoAnhChuaVeNha.jpg'
        },
        {
            name: 'Chỉ Là Không Cùng Nhau',
            singer: 'Tăng Phúc',
            path: './music/ChiLaKhongCungNhau.mp3',
            image: './image/ChiLaKhongCungNhau.jpg'
        },
        {
            name: 'Em Không Sai, Chúng Ta Sai',
            singer: 'Erik',
            path: './music/EmKhongSaiChungTaSai.mp3',
            image: './image/EmKhongSaiChungTaSai.jpg'
        },
        {
            name: 'Níu Duyên',
            singer: 'Lê Bảo Bình',
            path: './music/NiuDuyen.mp3',
            image: './image/NiuDuyen.jpg'
        },
        {
            name: 'Thích Thì Đến',
            singer: 'Lê Bảo Bình',
            path: './music/ThichThiDen.mp3',
            image: './image/ThichThiDen.jpg'
        },
        {
            name: 'Tất Cả Sẽ Thay Em',
            singer: 'Phạm Quỳnh Anh',
            path: './music/TatCaSeThayEm.mp3',
            image: './image/TatCaSeThayEm.jpg'
        },
        {
            name: 'Trên Tình Bạn Dưới Tình Yêu',
            singer: 'Min',
            path: './music/TrenTinhBanDuoiTinhYeu.mp3',
            image: './image/TrenTinhBanDuoiTinhYeu.jpg'
        },
        {
            name: 'Tình Bạn Diệu Kỳ',
            singer: 'Amee',
            path: './music/TinhBanDieuKy.mp3',
            image: './image/TinhBanDieuKy.jpg'
        },
        {
            name: 'Anh Nhà Ở Đâu Thế',
            singer: 'Amee',
            path: './music/AnhNhaODauThe.mp3',
            image: './image/AnhNhaODauThe.jpg'
        },
        {
            name: 'Đừng Yêu Nữa Em Mệt Rồi',
            singer: 'Min',
            path: './music/DungYeuNuaEmMetRoi.mp3',
            image: './image/DungYeuNuaEmMetRoi.jpg'
        },
        {
            name: 'Hoa Nở Không Màu',
            singer: 'Hoài Lâm',
            path: './music/HoaNoKhongMau.mp3',
            image: './image/HoaNoKhongMau.jpg'
        },
        {
            name: 'Sài Gòn Đau Lòng Quá',
            singer: 'Hứa Kim Tuyền ft Hoàng Duyên',
            path: './music/SaiGonDauLongQua.mp3',
            image: './image/SaiGonDauLongQua.jpg'
        },
        {
            name: 'Cứ Ngỡ Là Anh',
            singer: 'Đinh Tùng Huy',
            path: './music/CuNgoLaAnh.mp3',
            image: './image/CuNgoLaAnh.jpg'
        },
        {
            name: 'Cố Giang Tình',
            singer: 'X2X',
            path: './music/CoGiangTinh.mp3',
            image: './image/CoGiangTinh.jpg'
        }
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}');">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
        `
        });
        playList.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth

        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 30000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop;
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            cd.style.opacity = newWidth / cdWidth;
        }

        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent;
            }
        }
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime;
        }
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollActiveSong();
        }
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollActiveSong();
        }
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active )');

            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                if (e.target.closest('.option')) {

                }
            }
        }
    },
    scrollActiveSong: function() {
        if (this.active = this.songs.length - 1) {
            setTimeout(() => {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }, 300)
        } else {
            setTimeout(() => {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                })
            }, 300)
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0;
            }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1;
            }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function() {
        this.defineProperties();
        this.handleEvent();
        this.loadCurrentSong();
        this.render();
    }
}
app.start();