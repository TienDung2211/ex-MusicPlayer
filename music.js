const song = [
    {
        name: 'I' + 'll Be There',
        singer: 'Gabriela Bee',
        path: './assets/song/song1.mp3',
        image: './assets/image/song1.jpg'
    },
    {
        name: 'I Miss You',
        singer: 'Czarina',
        path: './assets/song/song2.mp3',
        image: './assets/image/song2.jpg'
    },
    {
        name: 'Shape of You',
        singer: 'Ed Sheeran',
        path: './assets/song/song3.mp3',
        image: './assets/image/song3.jpg'
    },
    {
        name: 'Just Give Me a Reason',
        singer: 'Pink, Nate Ruess',
        path: './assets/song/song4.mp3',
        image: './assets/image/song4.jpg'
    },
    {
        name: 'Counting Stars',
        singer: 'OneRepublic',
        path: './assets/song/song5.mp3',
        image: './assets/image/song5.jpg'
    },
    {
        name: 'Turn Back Time',
        singer: 'Daniel Schulz',
        path: './assets/song/song6.mp3',
        image: './assets/image/song6.jpg'
    },
    {
        name: 'Love Me Like You Do',
        singer: 'Ellie Goulding',
        path: './assets/song/song7.mp3',
        image: './assets/image/song7.jpg'
    }
]

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
// const progress = $('#progress')
const progressTotal = $('.w3-border')
const progress2 = $('.w3-grey')
const nextBtn = $('.btn-next')
const preBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'I' + 'll Be There',
            singer: 'Gabriela Bee',
            path: './assets/song/song1.mp3',
            image: './assets/image/song1.jpg'
        },
        {
            name: 'I Miss You',
            singer: 'Czarina',
            path: './assets/song/song2.mp3',
            image: './assets/image/song2.jpg'
        },
        {
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            path: './assets/song/song3.mp3',
            image: './assets/image/song3.jpg'
        },
        {
            name: 'Just Give Me a Reason',
            singer: 'Pink, Nate Ruess',
            path: './assets/song/song4.mp3',
            image: './assets/image/song4.jpg'
        },
        {
            name: 'Counting Stars',
            singer: 'OneRepublic',
            path: './assets/song/song5.mp3',
            image: './assets/image/song5.jpg'
        },
        {
            name: 'Turn Back Time',
            singer: 'Daniel Schulz',
            path: './assets/song/song6.mp3',
            image: './assets/image/song6.jpg'
        },
        {
            name: 'Love Me Like You Do',
            singer: 'Ellie Goulding',
            path: './assets/song/song7.mp3',
            image: './assets/image/song7.jpg'
        },
        {
            name: 'Love Is Gone',
            singer: 'Dylan Matthew',
            path: './assets/song/song8.mp3',
            image: './assets/image/song8.jpg'
        }
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config)) 
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                        <div class="thumb" style="background-image: url('${song.image}')"></div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    handleEvents() {
        const cdWidth = cd.offsetWidth
        const _this = this

        // Xử lý CD quay
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lý phóng to thu nhỏ playlist
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newcdWidth = cdWidth - scrollTop

            cd.style.width = newcdWidth>0 ? newcdWidth + 'px' : 0
            cd.style.opacity = newcdWidth / cdWidth
        }

        // Xử lý khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying){
                audio.pause() 
            }else {
                audio.play()  
            }
        }

        // Khi song được chạy
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing') 
            cdThumbAnimate.play()
        }
        // Khi song bị dừng
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing') 
            cdThumbAnimate.pause()
        }
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                // progress.value = progressPercent
                progress2.style.width = progressPercent + '%'
            }
        }
        // Xử lý khi tua
        // progress.onchange = function(e) {
        //     const seekTime = (audio.duration * e.target.value) / 100
        //     audio.currentTime = seekTime
        // }
        progressTotal.onclick = function(e) {
            const progressPercent = (e.offsetX / progressTotal.offsetWidth) * 100
            const seekTime = (progressPercent / 100) * audio.duration
            progress2.style.width = progressPercent + '%'
            audio.currentTime = seekTime
        }
        // Khi next bài hát
        nextBtn.onclick = function() {
            if(_this.isRandom){
                _this.randomSong()
            }else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // Khi pre bài hát
        preBtn.onclick = function() {
            if(_this.isRandom){
                _this.randomSong()
            }else {
                _this.preSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // Khi random bài hát
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        // Xử lý lặp bài hát
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Khi kết thúc bài hát
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            }else {
                nextBtn.click()
            }
        }

        // Lắng nghe khi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                if (songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                if (e.target.closest('.option')){

                }
            }
        }
    },
    nextSong() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    preSong() {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    scrollToActiveSong() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 500)
    },
    start: function(){
        // Load Config
        this.loadConfig()

        // Định nghĩa các thuộc tính cho Object
        this.defineProperties()

        // Lắng nghe/ xử lí các sự kiện (DOM Events)
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Render Playlist
        this.render()

        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start()
