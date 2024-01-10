<template> 
  
<div class="content-main-box">
    <div class="content-box1 mb-3">
      <div class="content__title-box">
        <h1 class="content-title">Payment Information</h1>
      </div>
      <div class="title-2">Existing Cards</div>

      <div class="cards-info">
        <div class="cards-info__box active">
          <div class="title">
            <label class="checkbox-container">
              <input type="checkbox" name="card" class="yesNoSwitch" checked="" value="Yes">
            </label>

            <img class="cardIcon" src="~/assets/images/master-card.png?timestamp=1702713690697" alt="Master card">
          </div>

          <div class="card-number">
            <div class="title">Card number</div>
            <div class="pin-code">**** **** **** 1234</div>
          </div>

          <div class="card-valid">
            <div>
              <div>Valid Through</div>
              <div class="date">05/25</div>
            </div>
          </div>
        </div>

        <div class="cards-info__box">
          <div class="title">
            <label class="checkbox-container">
              <input type="checkbox" name="card" class="yesNoSwitch" value="No">
            </label>

            <img class="cardIcon" src="~/assets/images/visa-card.png?timestamp=1702713690697" alt="Visa card">
          </div>

          <div class="card-number">
            <div class="title">Card number</div>
            <div class="pin-code">**** **** **** 5678</div>
          </div>

          <div class="card-valid">
            <div>
              <div>Valid Through</div>
              <div class="date">05/25</div>
            </div>

            <div class="remove">
              <img class="remove__icon" src="~/assets/images/svg/x-grey-icon.svg?timestamp=1702713690697" alt="Remvoe icon">
              remove
            </div>
          </div>
        </div>

        <div class="cards-info__add">
          <div class="add-card">
            <img class="plusIcon" src="~/assets/images/svg/plus-icon.svg?timestamp=1702713690697" alt="Plus icon">
            Add New Card
          </div>
        </div>
      </div>

    </div>

    <div class="content-box1">
      <div class="content__title-box">
        <h1 class="content-title">Purchase History</h1>

        <div class="filter-box packagesByStatus">
          <a href="#" class="filter-option is-active" data-text="All">All</a>
          <a href="#" class="filter-option" data-text="Membership">Membership</a>
          <a href="#" class="filter-option" data-text="Store">Store</a>
        </div>
      </div>

      <div class="scroll-purchase">
        <table class="purchase-history">
          <tbody><tr>
            <th>Invoice #</th>
            <th>Item</th>
            <th>Price</th>
            <th>Time</th>
            <th>Date</th>
            <th>Device</th>
            <th>Card</th>
          </tr>

          <tr>
            <td>
              <img class="downloadIcon" src="~/assets/images/svg/download.svg?timestamp=1702713690697" alt="Download">
              INV12345678
            </td>
            <td>3 Months Unlimited</td>
            <td>AED 3,105</td>
            <td>08:15 AM</td>
            <td>Dec 14, 2021</td>
            <td>Member's App</td>
            <td>
              <img class="cardIcon" src="~/assets/images/master-card.png?timestamp=1702713690697" alt="Master card">
              ****1234
            </td>
          </tr>

          <tr>
            <td>
              <img class="downloadIcon" src="~/assets/images/svg/download.svg?timestamp=1702713690697" alt="Download">
              INV12345678
            </td>
            <td>3 Months Unlimited</td>
            <td>AED 3,105</td>
            <td>08:15 AM</td>
            <td>Dec 14, 2021</td>
            <td>Member's App</td>
            <td>
              <img class="cardIcon" src="~/assets/images/master-card.png?timestamp=1702713690697" alt="Master card">
              ****1234
            </td>
          </tr>

          <tr>
            <td>
              <img class="downloadIcon" src="~/assets/images/svg/download.svg?timestamp=1702713690697" alt="Download">
              INV12345678
            </td>
            <td>3 Months Unlimited</td>
            <td>AED 3,105</td>
            <td>08:15 AM</td>
            <td>Dec 14, 2021</td>
            <td>Member's App</td>
            <td>
              <img class="cardIcon" src="~/assets/images/master-card.png?timestamp=1702713690697" alt="Master card">
              ****1234
            </td>
          </tr>

        </tbody></table>
      </div>

    </div>
  </div>  

</template>
  
<script lang="ts" setup>
const props = defineProps({
  memberId: {
    type: String,
    default: "",
  },
});

const { memberId } = toRefs(props);
const route = useRoute();
const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();

  
      setBreadcrumb({
        items: [
          { label: "Manage", link: "/" },
          { label: "Members", link: "/" },
        ],
      });
 
      setBreadcrumbTab({
        items: [
          {
            label: "Membership",
            link: `/members/${memberId.value}/membership-overview`,
          },
          { label: "Payment", link: `/members/${memberId.value}/payment` },
          {
            label: "Attendance",
            link: `/members/${memberId.value}/attendance`,
          },
          { label: "Wellness", link: `/members/${memberId.value}/wellness` },
          {
            label: "Assessments",
            link: `/members/${memberId.value}/assessments`,
          },
          { label: "Nutrition", link: `/members/${memberId.value}/nutrition` },
          {
            label: "Transformation",
            link: `/members/${memberId.value}/transformations`,
          },
          { label: "Friends", link: `/members/${memberId.value}/friends` },
          { label: "Badges", link: `/members/${memberId.value}/badges` },
          { label: "Notes", link: `/members/${memberId.value}/notes` },
          { label: "Activity", link: `/members/${memberId.value}/activity` },
        ],
      });
</script>
<style lang="scss" scoped>
// .content-main-box {
//     position: relative;
//     width: 700px;
//     max-width: 950px;
// }
// .content-main-box .content-box {
//     position: relative;
//     width: 65vw;
//     max-width: 950px;
//     min-height: 300px;
// }
.content-box1 {
    max-width: 1396px;
    /* height: calc(100vh - 129px); */
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.0784313725);
    padding: 20px;
    margin: 0 auto;
}
.content-main-box {
  position: relative;
  width: 65vw;
  max-width: 950px;
  height: 400px;


  .content-box {
    position: relative;
    width: 65vw;
    max-width: 950px;
    // min-height: 300px;
  }

  .content__title-box {
    justify-content: space-between;
    margin-bottom: 7px;
  }

  .title-2 {
    font: 22px $font-family-title;
    margin: 27px 0 16px;
  }
}

/*****************************
 ******* 2. Cards info *******
 ****************************/
.cards-info {
  display: flex;
  flex-wrap: wrap;

  &__box {
    width: 263px;
    border-radius: 10px;
    padding: 12px;
    background: #f1f2f2;
    color: #ffffff;
    margin-right: 20px;
    margin-bottom: 20px;
    height: 150px;

    .title {
      display: flex;
      justify-content: space-between;

      .cardIcon {
        width: 48px;
      }
    }

    .card-number {
      .title {
        width: 100%;
        margin-top: 15px;
        font: 10px $font-family-medium;
        text-transform: uppercase;
      }

      .pin-code {
        font: 22px $font-family-medium;
      }
    }

    .card-valid {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      margin-top: 5px;

      .date {
        font-weight: bold;
      }

      .remove {
        display: flex;
        align-items: flex-end;
        color: #cccccc;
        cursor: pointer;

        &__icon {
          opacity: 0.3;
          margin-right: 5px;
          margin-bottom: 3px;
        }
      }
    }

    .checkbox-container input[type="checkbox"] {
      z-index: 3;
    }

    &.active {
      color: #000000;
      background: #f2faff;
    }
  }

  &__add {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $main-blue;
    border-radius: 10px;
    width: 241px;
    height: 150px;

    .add-card {
      cursor: pointer;

      img {
        margin-right: 7px;
      }
    }
  }
}

/*****************************
 **** 3. Purchase History ****
 ****************************/
.purchase-history {
  width: 100%;
  margin-top: 30px;
  color: #000000;
  min-width: 800px;

  tr {
    td,
    th {
      padding: 7px;
    }

    th {
      &:first-child {
        padding-left: 42px;
      }
    }
  }

  .cardIcon {
    height: 22px;
  }

  .downloadIcon {
    height: 22px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}

.scroll-purchase {
  overflow-x: auto;
  position: relative;
  @include customScrollbar();

  &::-webkit-scrollbar {
    height: 7px;
  }
}
.filter-box .filter-option {
    color: #ccc;
    padding: 8px 12px;
    margin-right: 10px;
    border: 2px solid #f1f2f2;
    border-radius: 10px;
    text-decoration: none;
    transition: .35s;
    height: fit-content;
}
</style>




