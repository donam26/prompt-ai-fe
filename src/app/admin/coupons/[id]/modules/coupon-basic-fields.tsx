"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUPON_CONSTANTS } from "@/constants/coupon";

interface CouponBasicFieldsProps {
  control: any;
  errors: any;
  watchedType: string;
  onTypeChange: (value: string) => void;
}

export const CouponBasicFields = ({
  control,
  errors,
  watchedType,
  onTypeChange,
}: CouponBasicFieldsProps) => {
  return (
    <div className="space-y-6">
      {/* First row: Code and Type */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        {/* Code */}
        <div className="space-y-2">
          <Label htmlFor="code">
            Mã giảm giá <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input
                id="code"
                {...field}
                placeholder="Nhập mã giảm giá (VD: SALE20)"
                className={errors.code ? "border-red-500" : ""}
              />
            )}
          />
          {errors.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label>
            Loại giảm giá <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={value => {
                  field.onChange(value);
                  onTypeChange(value);
                }}
              >
                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                  <SelectValue placeholder="Chọn loại giảm giá" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={COUPON_CONSTANTS.TYPES.PERCENT}>
                    {COUPON_CONSTANTS.TYPE_LABELS.percent}
                  </SelectItem>
                  <SelectItem value={COUPON_CONSTANTS.TYPES.FIXED}>
                    {COUPON_CONSTANTS.TYPE_LABELS.fixed}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>
      </div>

      {/* Second row: Discount and Max Usage */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        {/* Discount */}
        <div className="space-y-2">
          <Label>
            Giá trị giảm giá <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder={
                    watchedType === COUPON_CONSTANTS.TYPES.PERCENT
                      ? "Nhập phần trăm (VD: 20)"
                      : "Nhập số tiền (VD: 100000)"
                  }
                  className={errors.discount ? "border-red-500" : ""}
                />
              )}
            />
            {watchedType === COUPON_CONSTANTS.TYPES.PERCENT && (
              <span className="top-1/2 right-3 absolute text-gray-500 -translate-y-1/2 transform">
                %
              </span>
            )}
          </div>
          {errors.discount && (
            <p className="text-red-500 text-sm">{errors.discount.message}</p>
          )}
        </div>

        {/* Max Usage */}
        <div className="space-y-2">
          <Label htmlFor="maxUsage">
            Số lượt sử dụng tối đa <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="maxUsage"
            control={control}
            render={({ field }) => (
              <Input
                id="maxUsage"
                {...field}
                type="number"
                value={field.value || ""}
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === "" ? undefined : Number(value));
                }}
                placeholder="Nhập số lượt sử dụng tối đa"
                min={1}
                className={errors.maxUsage ? "border-red-500" : ""}
              />
            )}
          />
          {errors.maxUsage && (
            <p className="text-red-500 text-sm">{errors.maxUsage.message}</p>
          )}
        </div>
      </div>

      {/* Third row: Expiry Date - Full width */}
      <div className="space-y-2">
        <Label htmlFor="expiryDate">
          Ngày hết hạn <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="expiryDate"
          control={control}
          render={({ field }) => (
            <Input
              id="expiryDate"
              {...field}
              type="date"
              placeholder="Chọn ngày hết hạn"
              className={`w-full md:w-1/2 ${errors.expiryDate ? "border-red-500" : ""}`}
            />
          )}
        />
        {errors.expiryDate && (
          <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>
        )}
      </div>
    </div>
  );
};
