export enum TagListEnum {
    title = 'title',
    body = 'body'
}

export type PostsType = {
    userId: number,
    id: number,
    title: TagListEnum.title,
    body: TagListEnum.body,
}

export type PhotoType = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}
