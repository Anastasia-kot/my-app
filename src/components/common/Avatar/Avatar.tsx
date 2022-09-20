import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { PhotosType } from '../../../redux/profile-reducer';


 
type Props = {
    photos?: PhotosType
    photo?: string //    | null, - должно быть так
    width: number // width  in px
}

export const Avatar: React.FC<Props> = ({ photos, photo, width }) => {
    return  (     
        (!photos?.large && !photos?.small && !photo)
         ? <UserOutlined style={{ 'width': `${width}px`, 'height': `${width}px`, 'fontSize': `${width - 10}px` }} />
         : <img alt='avatar' src={photos?.large || photos?.small || photo} style={{ 'width': `${width}px`, 'height': `${width}px` }} />
   )
}
 