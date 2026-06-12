import {
  ScrollView,
  View,
  Text,
  Pressable,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { router } from "expo-router";

import {
  ArrowLeft,
} from "lucide-react-native";

import DetailSection from "../components/DetailSection";
import DetailRow from "../components/DetailRow";

export default function AdditionalDetailsScreen() {
  const student = {
    gender: "M",
    bloodGroup: "AB+",
    aadhaarNo: "804445884628",
    passportNo: "",

    pwd: "N",
    chronicDisease: "NIL",
    knownAllergies: "NIL",

    mobileNo: "1234567890",

    personalEmail:
      "tmrpraveen2005@gmail.com",

    parentMobile:
      "1234567890",

    localGuardianMobile:
      "1234567890",

    fatherEmail:
      "mozhi.raghu@gmail.com",

    motherEmail:
      "raghunath.tm@gmail.com",

    parentAddress:
      "2/53G",

    localGuardianAddress:
      "2/53G",

    bankName: "SBI",

    bankBranch: "Chennai",

    bankAccountHolderName:
      "PRAVEEN KUMAR",

    bankAccountNo:
      "1234567890",

    bankIfsc:
      "ABCD0123456",

    status: "Hosteller",

    verified: "Yes",

    statusRemarks:
      "Bulk verified import",
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
        }}
      >
        {/* Header */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            marginBottom: 20,
          }}
        >
          <Pressable
            onPress={() =>
                router.replace("/(student)/profile")
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,

              justifyContent: "center",
              alignItems: "center",

              backgroundColor:
                "#FFFFFF",

              borderWidth: 1,
              borderColor: "#E2E8F0",

              marginRight: 12,
            }}
          >
            <ArrowLeft
              size={20}
              color="#0F172A"
            />
          </Pressable>

          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              Additional Details
            </Text>

            <Text
              style={{
                marginTop: 2,
                fontSize: 13,
                color: "#64748B",
              }}
            >
              Institutional and personal
              information
            </Text>
          </View>
        </View>

        {/* PERSONAL */}

        <DetailSection title="Personal Information">
          <DetailRow
            label="Gender"
            value={student.gender}
          />

          <DetailRow
            label="Blood Group"
            value={student.bloodGroup}
          />

          <DetailRow
            label="Aadhaar Number"
            value={student.aadhaarNo}
          />

          <DetailRow
            label="Passport Number"
            value={student.passportNo}
          />

          <DetailRow
            label="PWD"
            value={student.pwd}
          />

          <DetailRow
            label="Chronic Disease"
            value={
              student.chronicDisease
            }
          />

          <DetailRow
            label="Known Allergies"
            value={
              student.knownAllergies
            }
            hideBorder
          />
        </DetailSection>

        {/* CONTACT */}

        <DetailSection title="Contact Information">
          <DetailRow
            label="Mobile Number"
            value={student.mobileNo}
          />

          <DetailRow
            label="Personal Email"
            value={
              student.personalEmail
            }
          />

          <DetailRow
            label="Parent Mobile"
            value={
              student.parentMobile
            }
          />

          <DetailRow
            label="Guardian Mobile"
            value={
              student.localGuardianMobile
            }
            hideBorder
          />
        </DetailSection>

        {/* PARENTS */}

        <DetailSection title="Parents & Guardian">
          <DetailRow
            label="Father Email"
            value={
              student.fatherEmail
            }
          />

          <DetailRow
            label="Mother Email"
            value={
              student.motherEmail
            }
          />

          <DetailRow
            label="Parent Address"
            value={
              student.parentAddress
            }
          />

          <DetailRow
            label="Guardian Address"
            value={
              student.localGuardianAddress
            }
            hideBorder
          />
        </DetailSection>

        {/* BANKING */}

        <DetailSection title="Banking Information">
          <DetailRow
            label="Bank Name"
            value={student.bankName}
          />

          <DetailRow
            label="Bank Branch"
            value={
              student.bankBranch
            }
          />

          <DetailRow
            label="Account Holder"
            value={
              student.bankAccountHolderName
            }
          />

          <DetailRow
            label="Account Number"
            value={
              student.bankAccountNo
            }
          />

          <DetailRow
            label="IFSC Code"
            value={student.bankIfsc}
            hideBorder
          />
        </DetailSection>

        {/* HOSTEL */}

        <DetailSection title="Hostel Status">
          <DetailRow
            label="Status"
            value={student.status}
          />

          <DetailRow
            label="Verified"
            value={student.verified}
          />

          <DetailRow
            label="Remarks"
            value={
              student.statusRemarks
            }
            hideBorder
          />
        </DetailSection>
      </ScrollView>
    </SafeAreaView>
  );
}