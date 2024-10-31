import Image, { ImageProps } from "next/image";


const Logo: React.FC<React.PropsWithChildren<ImageProps>> = (props) => {
    // const logoClass = useMemo(()=>{
    //     const klass : string[] = [];
    // }, []);
    
    return (
        <div>
            <Image
                {...props}
                alt={props.alt}
                height={props.height}
                width={props.width}
            />
        </div>
    )
}

export default Logo;