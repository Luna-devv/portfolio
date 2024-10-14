export function getAvatar(id: string, avatar_hash: string | null | undefined) {
    if (!avatar_hash) return "https://cdn.discordapp.com/embed/avatars/5.png";
    return "https://cdn.discordapp.com/avatars/" + id + "/" + avatar_hash + ".webp?size=512";
}