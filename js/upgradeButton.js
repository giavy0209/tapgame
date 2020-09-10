class upgradeButton{
    constructor(game) { 
        this.game = game
        this.borderSize = 10

        this.startPosX = 0

        this.endPosX = 0

        this.startPosY = this.game.height - this.game.bottomZoneHeight + this.borderSize / 2
        this.endPosY = this.game.height


        this.buttonWidth = (this.game.height / 5) - (this.borderSize * 2)
        this.buttonHeight = this.game.bottomZoneHeight / 2
        this.color = '#fff'
        this.borderColor = '#000'

        this.listButton = [
            {
                text : 'Damage + 1',
                call : () => {
                    this.game.dmg += this.game.dmgIncrease
                    this.game.dmglv++
                }
            }
        ]
        this.clickPosX = this.game.clickPosX 
        this.clickPosY = this.game.clickPosY 
    } 

    update () {
        this.clickPosX = this.game.clickPosX 
        this.clickPosY = this.game.clickPosY 
    }

    draw () {
        this.listButton.forEach((button,index) => {
            var top = this.startPosY
            var left = this.startPosX * index + this.borderSize / 2
            var right = this.startPosX * index + this.borderSize / 2 + this.buttonWidth
            var bottom = this.startPosY + this.buttonHeight

            this.game.ctx.fillStyle = this.color

            this.game.ctx.beginPath()
            this.game.ctx.moveTo (left, top)
            this.game.ctx.lineTo (right,top)
            this.game.ctx.lineTo (right,bottom )
            this.game.ctx.lineTo (left,bottom)
            this.game.ctx.fill()

            this.game.ctx.fillStyle = '#000'
            this.game.ctx.font = '40px Arial'
            this.game.ctx.textAlign = "center";
            this.game.ctx.textBaseline = "middle";
            this.game.ctx.fillText(
                button.text, 
                (right) / 2, 
                this.startPosY + this.buttonHeight / 2, 
            )

            this.game.ctx.closePath()

            this.game.ctx.strokeStyle = this.borderColor
            this.game.ctx.lineWidth = this.borderSize
            this.game.ctx.stroke()

            if(
                this.clickPosX >= left &&
                this.clickPosX <= right && 
                this.clickPosY >= top &&
                this.clickPosY <= bottom
            ){
                this.game.clickPosX = null
                this.game.clickPosY = null
                this.color = '#ccc'
                setTimeout(() => {
                    this.color = '#fff'
                }, 100);
                button.call()
            }

        })
    }
}