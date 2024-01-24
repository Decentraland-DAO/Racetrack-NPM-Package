import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"

export type MinimapConfig = {
    src: string,
    srcWidth: number,
    srcHeight: number,
    parcelWidth: number,
    parcelHeight: number,
    bottomLeftX: number,
    bottomLeftZ: number,
    paddingX?: number,
    paddingZ?: number
}

export class Minimap {
    private static readonly SCALE: number = 0.4

    static visibility: boolean = false
    private static posX: number = 0
    private static posZ: number = 0

    private static imageSrc: string = ""
    private static imageWidth: number = 0
    private static imageHeight: number = 0
    private static parcelWidth: number = 0
    private static parcelHeight: number = 0
    private static bottomLeftX: number = 0
    private static bottomLeftZ: number = 0
    private static paddingX: number = 0
    private static paddingZ: number = 0

    private static component = () => (
        <UiEntity
            uiTransform={{
                position: { right: '0px', top: '170px' },
                width: Minimap.imageWidth * Minimap.SCALE,
                height: Minimap.imageHeight * Minimap.SCALE,
                positionType: 'absolute',
                display: Minimap.visibility ? 'flex' : 'none'
            }}
            uiBackground={{
                textureMode: 'stretch',
                texture: {
                    src: Minimap.imageSrc
                }
            }}
        >
            <UiEntity
                uiTransform={{
                    position: { bottom: Minimap.posZ, left: Minimap.posX },
                    width: 15,
                    height: 15,
                    positionType: 'absolute',
                }}
                uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                        src: "images/red_dot.png"
                    }
                }}
            >
            </UiEntity>
        </UiEntity>
    )

    static Load(_data: MinimapConfig): void {
        Minimap.imageSrc = _data.src
        Minimap.imageWidth = _data.srcWidth
        Minimap.imageHeight = _data.srcHeight
        Minimap.parcelWidth = _data.parcelWidth
        Minimap.parcelHeight = _data.parcelHeight
        Minimap.bottomLeftX = _data.bottomLeftX
        Minimap.bottomLeftZ = _data.bottomLeftZ
        Minimap.paddingX = _data.paddingX ?? 0
        Minimap.paddingZ = _data.paddingZ ?? 0
    }

    static Render() {
        return [
            Minimap.component()
        ]
    }

    static Show() {
        Minimap.visibility = true
    }

    static Hide() {
        Minimap.visibility = false
    }

    static Update(_x: number, _z: number) {
        const width = Minimap.parcelWidth * 16
        const height = Minimap.parcelHeight * 16

        const relX = _x - Minimap.bottomLeftX - Minimap.paddingX
        const relZ = _z - Minimap.bottomLeftZ - Minimap.paddingZ

        Minimap.posX = (relX / width) * Minimap.imageWidth * Minimap.SCALE
        Minimap.posZ = (relZ / height) * Minimap.imageHeight * Minimap.SCALE
    }
}