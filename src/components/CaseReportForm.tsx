import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

interface FormData {
  lotNumber: string;
  patientId: string;
  treatmentDate: string;
  age: string;
  gender: string;
  otherInformation: string;
  anticoagulantUse: string;
  anticoagulantType: string;
  anatomicalRegion: string[];
  anatomicalOther: string;
  bleedingType: string;
  injuryType: string[];
  injuryOther: string;
  hemostaticMeasure: string[];
  hemostaticOther: string;
  bleedingControlled: string;
  bleedingComment: string;
  productsUsed: string;
  productsCount: string;
  unexpectedReactions: string;
  reactionsDescription: string;
  difficultConditions: string[];
  conditionsOther: string;
  packageOpening: string;
  packageComment: string;
  removalHours: string;
  removalEvaluation: string;
}

const CaseReportForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    lotNumber: '',
    patientId: '',
    treatmentDate: '',
    age: '',
    gender: '',
    otherInformation: '',
    anticoagulantUse: '',
    anticoagulantType: '',
    anatomicalRegion: [],
    anatomicalOther: '',
    bleedingType: '',
    injuryType: [],
    injuryOther: '',
    hemostaticMeasure: [],
    hemostaticOther: '',
    bleedingControlled: '',
    bleedingComment: '',
    productsUsed: '',
    productsCount: '',
    unexpectedReactions: '',
    reactionsDescription: '',
    difficultConditions: [],
    conditionsOther: '',
    packageOpening: '',
    packageComment: '',
    removalHours: '',
    removalEvaluation: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: 'anatomicalRegion' | 'injuryType' | 'hemostaticMeasure' | 'difficultConditions', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const generateEmailContent = () => {
    return `
Case Report Submission

1. XXX® LOT number: ${formData.lotNumber}
2. Anonymized patient identification: ${formData.patientId}
3. Date of treatment: ${formData.treatmentDate}
4. Age: ${formData.age}
5. Gender: ${formData.gender}
6. Other information: ${formData.otherInformation}
7. Anticoagulant use: ${formData.anticoagulantUse}${formData.anticoagulantType ? ` - Type: ${formData.anticoagulantType}` : ''}
8. Anatomical region of injury: ${formData.anatomicalRegion.join(', ')}${formData.anatomicalOther ? ` - Other: ${formData.anatomicalOther}` : ''}
9. Type of bleeding: ${formData.bleedingType}
10. Type of injury: ${formData.injuryType.join(', ')}${formData.injuryOther ? ` - Other: ${formData.injuryOther}` : ''}
11. Complementary hemostatic measure: ${formData.hemostaticMeasure.join(', ')}${formData.hemostaticOther ? ` - Other: ${formData.hemostaticOther}` : ''}
12. Could the bleeding be controlled with XXX®: ${formData.bleedingControlled}${formData.bleedingComment ? ` - Comment: ${formData.bleedingComment}` : ''}
13. How many products were used: ${formData.productsUsed}${formData.productsCount ? ` - Count: ${formData.productsCount}` : ''}
14. Unexpected reactions: ${formData.unexpectedReactions}${formData.reactionsDescription ? ` - Description: ${formData.reactionsDescription}` : ''}
15. Difficult conditions: ${formData.difficultConditions.join(', ')}${formData.conditionsOther ? ` - Other: ${formData.conditionsOther}` : ''}
16. Package opening evaluation: ${formData.packageOpening}${formData.packageComment ? ` - Comment: ${formData.packageComment}` : ''}
17. Hours until XXX® removal: ${formData.removalHours}
18. Removal evaluation: ${formData.removalEvaluation}

Submitted at: ${new Date().toLocaleString()}
    `;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // For now, we'll simulate email sending - you'll need to configure EmailJS later
      // To properly configure EmailJS:
      // 1. Sign up at https://www.emailjs.com/
      // 2. Create a service (Gmail, Outlook, etc.)
      // 3. Create an email template
      // 4. Get your service ID, template ID, and public key
      // 5. Replace the values below
      
      const serviceId = 'service_l7w6o44';
      const templateId = 'template_0xruv0d';
      const publicKey = 'c0RbzAq_uFP5eSTnu';
        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: 'jonas.hammarberg@spce.com',
            subject: 'Case Report Submission',
            message: generateEmailContent(),
            from_name: 'Case Report System'
          },
          publicKey
        );

      toast({
        title: "Success",
        description: "Case report submitted successfully!",
      });

      // Reset form
      setFormData({
        lotNumber: '',
        patientId: '',
        treatmentDate: '',
        age: '',
        gender: '',
        otherInformation: '',
        anticoagulantUse: '',
        anticoagulantType: '',
        anatomicalRegion: [],
        anatomicalOther: '',
        bleedingType: '',
        injuryType: [],
        injuryOther: '',
        hemostaticMeasure: [],
        hemostaticOther: '',
        bleedingControlled: '',
        bleedingComment: '',
        productsUsed: '',
        productsCount: '',
        unexpectedReactions: '',
        reactionsDescription: '',
        difficultConditions: [],
        conditionsOther: '',
        packageOpening: '',
        packageComment: '',
        removalHours: '',
        removalEvaluation: ''
      });

    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to submit case report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Case Report</CardTitle>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Thank you for your quick action!</p>
            <p>After using XXX®, please take 1–2 minutes to fill out this short report as completely as possible. Your feedback helps us ensure the product works reliably in real-life situations and improves care for future patients. We kindly request you to provide your email address to prevent misuse. All information will be kept confidential.</p>
            <p>Thanks a lot in advance.</p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lotNumber">1. XXX® LOT number:</Label>
                <Input
                  id="lotNumber"
                  value={formData.lotNumber}
                  onChange={(e) => handleInputChange('lotNumber', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientId">2. Anonymized patient identification:</Label>
                <Input
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) => handleInputChange('patientId', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatmentDate">3. Date of treatment:</Label>
                <Input
                  id="treatmentDate"
                  type="date"
                  value={formData.treatmentDate}
                  onChange={(e) => handleInputChange('treatmentDate', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">4. Age:</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label>5. Gender:</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                className="flex flex-row space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="diverse" id="diverse" />
                  <Label htmlFor="diverse">diverse</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Other Information */}
            <div className="space-y-2">
              <Label htmlFor="otherInfo">6. Other information:</Label>
              <Textarea
                id="otherInfo"
                placeholder="(e.g. previous illnesses, smoker, alcohol influence, medication)"
                value={formData.otherInformation}
                onChange={(e) => handleInputChange('otherInformation', e.target.value)}
                className="w-full min-h-[80px]"
              />
            </div>

            {/* Anticoagulant Use */}
            <div className="space-y-3">
              <Label>7. Anticoagulant use:</Label>
              <RadioGroup
                value={formData.anticoagulantUse}
                onValueChange={(value) => handleInputChange('anticoagulantUse', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="anticoag-yes" />
                  <Label htmlFor="anticoag-yes">yes, which one:</Label>
                  <Input
                    value={formData.anticoagulantType}
                    onChange={(e) => handleInputChange('anticoagulantType', e.target.value)}
                    className="ml-2 flex-1"
                    disabled={formData.anticoagulantUse !== 'yes'}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="anticoag-no" />
                  <Label htmlFor="anticoag-no">no</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unknown" id="anticoag-unknown" />
                  <Label htmlFor="anticoag-unknown">unknown</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Anatomical Region */}
            <div className="space-y-3">
              <Label>8. Anatomical region of injury:</Label>
              <div className="space-y-2">
                {['extremities', 'trunk/abdomen', 'inguinal', 'head/neck'].map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={`anatomy-${region}`}
                      checked={formData.anatomicalRegion.includes(region)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('anatomicalRegion', region, checked as boolean)
                      }
                    />
                    <Label htmlFor={`anatomy-${region}`}>{region}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anatomy-others"
                    checked={formData.anatomicalRegion.includes('others')}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('anatomicalRegion', 'others', checked as boolean)
                    }
                  />
                  <Label htmlFor="anatomy-others">others, please describe:</Label>
                  <Input
                    value={formData.anatomicalOther}
                    onChange={(e) => handleInputChange('anatomicalOther', e.target.value)}
                    className="ml-2 flex-1"
                    disabled={!formData.anatomicalRegion.includes('others')}
                  />
                </div>
              </div>
            </div>

            {/* Type of Bleeding */}
            <div className="space-y-3">
              <Label>9. Type of bleeding:</Label>
              <RadioGroup
                value={formData.bleedingType}
                onValueChange={(value) => handleInputChange('bleedingType', value)}
                className="flex flex-row space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="arterial" id="bleeding-arterial" />
                  <Label htmlFor="bleeding-arterial">arterial</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="venous/mixed" id="bleeding-venous" />
                  <Label htmlFor="bleeding-venous">venous/mixed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unknown" id="bleeding-unknown" />
                  <Label htmlFor="bleeding-unknown">unknown</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Type of Injury */}
            <div className="space-y-3">
              <Label>10. Type of injury:</Label>
              <div className="space-y-2">
                {['aaa', 'bbb', 'ccc', 'ddd'].map((injury) => (
                  <div key={injury} className="flex items-center space-x-2">
                    <Checkbox
                      id={`injury-${injury}`}
                      checked={formData.injuryType.includes(injury)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('injuryType', injury, checked as boolean)
                      }
                    />
                    <Label htmlFor={`injury-${injury}`}>{injury}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="injury-others"
                    checked={formData.injuryType.includes('others')}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('injuryType', 'others', checked as boolean)
                    }
                  />
                  <Label htmlFor="injury-others">others, please describe:</Label>
                  <Input
                    value={formData.injuryOther}
                    onChange={(e) => handleInputChange('injuryOther', e.target.value)}
                    className="ml-2 flex-1"
                    disabled={!formData.injuryType.includes('others')}
                  />
                </div>
              </div>
            </div>

            {/* Hemostatic Measure */}
            <div className="space-y-3">
              <Label>11. Complementary hemostatic measure:</Label>
              <div className="space-y-2">
                {['tourniquet', 'compression bandage'].map((measure) => (
                  <div key={measure} className="flex items-center space-x-2">
                    <Checkbox
                      id={`hemostatic-${measure}`}
                      checked={formData.hemostaticMeasure.includes(measure)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('hemostaticMeasure', measure, checked as boolean)
                      }
                    />
                    <Label htmlFor={`hemostatic-${measure}`}>{measure}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hemostatic-others"
                    checked={formData.hemostaticMeasure.includes('others')}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('hemostaticMeasure', 'others', checked as boolean)
                    }
                  />
                  <Label htmlFor="hemostatic-others">others, please describe:</Label>
                  <Input
                    value={formData.hemostaticOther}
                    onChange={(e) => handleInputChange('hemostaticOther', e.target.value)}
                    className="ml-2 flex-1"
                    disabled={!formData.hemostaticMeasure.includes('others')}
                  />
                </div>
              </div>
            </div>

            {/* Bleeding Control */}
            <div className="space-y-3">
              <Label>12. Could the bleeding be controlled with XXX®:</Label>
              <RadioGroup
                value={formData.bleedingControlled}
                onValueChange={(value) => handleInputChange('bleedingControlled', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completely" id="control-completely" />
                  <Label htmlFor="control-completely">completely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partially" id="control-partially" />
                  <Label htmlFor="control-partially">partially</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not" id="control-not" />
                  <Label htmlFor="control-not">not</Label>
                </div>
              </RadioGroup>
              <div className="mt-2">
                <Label htmlFor="controlComment">Comment:</Label>
                <Input
                  id="controlComment"
                  value={formData.bleedingComment}
                  onChange={(e) => handleInputChange('bleedingComment', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Products Used */}
            <div className="space-y-3">
              <Label>13. How many products were used on this patient:</Label>
              <RadioGroup
                value={formData.productsUsed}
                onValueChange={(value) => handleInputChange('productsUsed', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="products-1" />
                  <Label htmlFor="products-1">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="more" id="products-more" />
                  <Label htmlFor="products-more">more, how many?</Label>
                  <Input
                    type="number"
                    value={formData.productsCount}
                    onChange={(e) => handleInputChange('productsCount', e.target.value)}
                    className="ml-2 w-24"
                    disabled={formData.productsUsed !== 'more'}
                  />
                </div>
              </RadioGroup>
            </div>

            {/* Unexpected Reactions */}
            <div className="space-y-3">
              <Label>14. Where there any unexpected reactions?</Label>
              <RadioGroup
                value={formData.unexpectedReactions}
                onValueChange={(value) => handleInputChange('unexpectedReactions', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="reactions-no" />
                  <Label htmlFor="reactions-no">no</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="reactions-yes" />
                  <Label htmlFor="reactions-yes">yes, please describe:</Label>
                  <Input
                    value={formData.reactionsDescription}
                    onChange={(e) => handleInputChange('reactionsDescription', e.target.value)}
                    className="ml-2 flex-1"
                    disabled={formData.unexpectedReactions !== 'yes'}
                  />
                </div>
              </RadioGroup>
            </div>

            {/* Difficult Conditions */}
            <div className="space-y-3">
              <Label>15. Have there been difficult conditions?</Label>
              <div className="space-y-2">
                {['no', 'darkness', 'wet/snow conditions'].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={`condition-${condition}`}
                      checked={formData.difficultConditions.includes(condition)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('difficultConditions', condition, checked as boolean)
                      }
                    />
                    <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="condition-others"
                    checked={formData.difficultConditions.includes('others')}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('difficultConditions', 'others', checked as boolean)
                    }
                  />
                  <Label htmlFor="condition-others">others, please describe:</Label>
                  <Input
                    value={formData.conditionsOther}
                    onChange={(e) => handleInputChange('conditionsOther', e.target.value)}
                    className="ml-2 flex-1"
                    disabled={!formData.difficultConditions.includes('others')}
                  />
                </div>
              </div>
            </div>

            {/* Package Opening */}
            <div className="space-y-3">
              <Label>16. Evaluate the opening of the package:</Label>
              <RadioGroup
                value={formData.packageOpening}
                onValueChange={(value) => handleInputChange('packageOpening', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="easy" id="package-easy" />
                  <Label htmlFor="package-easy">easy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="difficult" id="package-difficult" />
                  <Label htmlFor="package-difficult">difficult</Label>
                </div>
              </RadioGroup>
              <div className="mt-2">
                <Label htmlFor="packageComment">Comment:</Label>
                <Input
                  id="packageComment"
                  value={formData.packageComment}
                  onChange={(e) => handleInputChange('packageComment', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Removal Hours */}
            <div className="space-y-2">
              <Label htmlFor="removalHours">17. After how many hours was XXX® removed from the wound?</Label>
              <Input
                id="removalHours"
                value={formData.removalHours}
                onChange={(e) => handleInputChange('removalHours', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Removal Evaluation */}
            <div className="space-y-2">
              <Label htmlFor="removalEval">18. Evaluate the removal of XXX® from the wound:</Label>
              <Textarea
                id="removalEval"
                placeholder="(e.g. sticking, rebleeding, painless removal, rinsing solution)"
                value={formData.removalEvaluation}
                onChange={(e) => handleInputChange('removalEvaluation', e.target.value)}
                className="w-full min-h-[80px]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                className="w-full md:w-auto px-8 py-3 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseReportForm;
