﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace my_Water.Migrations.OrderDB
{
    [DbContext(typeof(OrderDBContext))]
    [Migration("20250425022827_InitialCR")]
    partial class InitialCR
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.3");

            modelBuilder.Entity("Notification", b =>
                {
                    b.Property<string>("notfication_id")
                        .HasColumnType("TEXT");

                    b.Property<string>("content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("notification_topc")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("order_id")
                        .HasColumnType("INTEGER");

                    b.HasKey("notfication_id");

                    b.HasIndex("order_id");

                    b.ToTable("notifications");
                });

            modelBuilder.Entity("Order", b =>
                {
                    b.Property<int>("_order_no")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("_date")
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("_item_list")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("order_status")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("total_price")
                        .HasColumnType("REAL");

                    b.Property<string>("user_id")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("_order_no");

                    b.HasIndex("user_id");

                    b.ToTable("orders");
                });

            modelBuilder.Entity("Notification", b =>
                {
                    b.HasOne("Order", "order")
                        .WithMany("notification_list")
                        .HasForeignKey("order_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("order");
                });

            modelBuilder.Entity("Order", b =>
                {
                    b.Navigation("notification_list");
                });
#pragma warning restore 612, 618
        }
    }
}
