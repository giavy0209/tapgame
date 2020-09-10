class monsterhp {
    constructor (game) {
        this.game = game
        this.width = this.game.width
        this.height = this.game.height * HP_BAR_HEIGHT
    }

    update(){
        this.width =this.game.isMonsterReset ? 0 : this.game.width * (this.game.currentHP /this.game.startHP)
    }

    draw () {
        this.game.ctx.beginPath()
        this.game.ctx.moveTo(0 , 0)
        this.game.ctx.lineTo(this.width , 0)
        this.game.ctx.lineTo(this.width, this.height)
        this.game.ctx.lineTo(0 , this.height)
        this.game.ctx.closePath()
        this.game.ctx.fillStyle = '#ff0000'
        this.game.ctx.fill()

        this.game.ctx.font = '25px Arial'
        this.game.ctx.fillStyle = '#00ff00'
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText(`${this.game.isMonsterReset ? 0 : this.game.currentHP}/${this.game.startHP}`, this.game.width/2, this.height/2)

        this.game.ctx.font = '40px Arial'
        this.game.ctx.fillStyle = '#00ff00'
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText(`${this.game.subStage}/10`, this.game.width/2, this.height * 2)

        this.game.ctx.font = '40px Arial'
        this.game.ctx.fillStyle = '#00ff00'
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText(`Stage = ${this.game.stage}`, this.game.width/2, this.height * 3)
    }
}