import { PriceInfoCard } from '@/components/PriceInfoCard';
import { getProductById } from '@/lib/actions';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect('/');

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                <p className="flex">
                  Ver producto
                  <Image
                    src="assets/icons/arrow-right.svg"
                    alt="Arrow Right"
                    width={16}
                    height={16}
                    className="ml-2"
                  />
                </p>
              </Link>

              <div className="flex items-center gap-3">
                <div className="product-hearts">
                  <Image
                    src="/assets/icons/red-heart.svg"
                    alt="Red Heart"
                    width={20}
                    height={20}
                  />
                  {/* look up for an svg about stock or not? and then a ternary op
                   */}
                  <p className="text-sm font-semibold text-[#D46F77]">37</p>
                </div>
                <div className="p-2 bg-white-200 rounded-10">
                  <Image
                    src="/assets/icons/bookmark.svg"
                    alt="Bookmark"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="p-2 bg-white-200 rounded-10">
                  <Image
                    src="/assets/icons/share.svg"
                    alt="share"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
            <div className="product-info">
              <div className="flex flex-col gap-2">
                <p className="text-[34px] text-secondary font-bold">
                  € {product.finalPrice}
                </p>
                <p className="text-[21px] text-black opacity-50 line-through ">
                  € {product.oldPrice}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="product-stars">
                    <Image
                      src="/assets/icons/star.svg"
                      alt="star"
                      width={16}
                      height={16}
                    />
                    <p className="text-[12px] text-primary font-semibold">12</p>
                  </div>
                  <div className="product-reviews">
                    <Image
                      src="/assets/icons/comment.svg"
                      alt="comments"
                      height={16}
                      width={16}
                    />
                    <p className="text-[12px] text-secondary font-semibold">
                      18 Reviews
                    </p>
                  </div>
                </div>

                <p className="text-sm text-black opacity-50">
                  <span className="text-primary-green font-semibold">90%</span>{' '}
                  de compradores recomiendan este producto!
                </p>
              </div>
            </div>

            <div className="my-7 flex flex-col gap-5">
              <div className="flex flex-wrap gap-5">
                <PriceInfoCard
                  title="Current Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={`€ ${product.finalPrice}`}
                  borderColor="#B6DBFF"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
