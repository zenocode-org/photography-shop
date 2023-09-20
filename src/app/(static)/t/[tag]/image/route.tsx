import { auth } from '@/auth';
import { getImageCacheHeadersForAuth } from '@/cache';
import {
  IMAGE_OG_SMALL_SIZE,
  MAX_PHOTOS_TO_SHOW_PER_TAG,
} from '@/photo/image-response';
import TagImageResponse from '@/photo/image-response/TagImageResponse';
import { getPhotos } from '@/services/postgres';
import { getIBMPlexMonoMedium } from '@/site/font';
import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request, context: any) {
  const photos = await getPhotos(
    undefined,
    MAX_PHOTOS_TO_SHOW_PER_TAG,
    undefined,
    context.params.tag,
  );

  const {
    fontFamily,
    fonts,
  } = await getIBMPlexMonoMedium();

  const headers = await getImageCacheHeadersForAuth(await auth());

  const { width, height } = IMAGE_OG_SMALL_SIZE;

  return new ImageResponse(
    <TagImageResponse {...{ photos, request, width, height, fontFamily }}/>,
    { width, height, fonts, headers },
  );
}
